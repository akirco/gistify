'use client';
import { CompliedComments, complieMDX } from '@/libs/utils/compileComment';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { randomStr } from '@/libs/utils/randomStr';
import { MDXRemote } from 'next-mdx-remote';
import { FaGithub } from 'react-icons/fa';
import { customMDX } from './custommdx';
import { ComponentProps } from 'react';
import moment from 'moment';
import axios from 'axios';

const MAX_OPEN_POPUP = 100000;

const openDialog = (url: string) => {
  const popup = window.open(url, '', 'width=700, height=700,fullscreen=no');
  let openDuration = 0;
  const promise = new Promise<string>((resolve, reject) => {
    const checking = setInterval(() => {
      const oauthCode = window.localStorage.getItem('oauthCode');
      if (oauthCode) {
        resolve(oauthCode);
      }
      clearInterval(checking);
      localStorage.removeItem('oauthCode');
      if (openDuration >= MAX_OPEN_POPUP) {
        popup?.close();
        reject(new Error('Timeout'));
        clearInterval(checking);
      }
      openDuration += 1000;
      if (popup?.closed) {
        reject(new Error('Closed'));
        clearInterval(checking);
      }
    }, 1000);
  });
  return promise;
};

const scopeAsParam = (scopes: string[]) => {
  return scopes.reduce((rev, curr) => `${rev}+${curr}`);
};

export const OauthComment = ({ id }: { id: string }) => {
  const [token, setToken] = useState('');
  const [currentComment, setCurrentComment] = useState('');
  const [commentList, setCommentList] = useState<CompliedComments>();
  const [refresh, setRefresh] = useState(0);

  //? 获取评论列表

  useEffect(() => {
    const fetchComments = () => {
      axios.get<Blog.Comments>(`/api/comment?id=${id}`).then((res) => {
        complieMDX(res.data).then((comments) => {
          if (comments) {
            setCommentList(comments);
          }
        });
      });
    };
    fetchComments();
    if (refresh) {
      fetchComments();
    }
  }, [id, refresh]);
  //? 渲染oauthbutton or comment textarea
  useEffect(() => {
    const accessToken = localStorage.getItem('gistify_accessToken');
    if (accessToken) {
      setToken(accessToken);
    }
  }, [id]);
  //? 临时码获取access token
  const getAccessToken = (code: string) => {
    if (code) {
      axios
        .post<{
          access_token: string;
          token_type: 'bearer';
          scope: string;
        }>(
          '/api/oauth',
          {
            code,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          if (res.data.access_token) {
            localStorage.setItem('gistify_accessToken', res.data.access_token);
            localStorage.removeItem('oauthCode');
            setToken(res.data.access_token);
          }
        });
    }
  };

  const oauthGithub = () => {
    const GITHUB_ID = '856d499edda6dbd8b8e7';
    // const GITHUB_REDIRECT_URI = 'http://localhost:3000/oauth'; //development
    const GITHUB_REDIRECT_URI = 'https://gistify.extrameta.cn/oauth'; //production
    const state = randomStr(6);
    const scopes = ['read:user', 'gist'];
    const dialogUrl = new URL('https://github.com/login/oauth/authorize');
    const dialogUrlParam = dialogUrl.searchParams;
    dialogUrlParam.append('client_id', GITHUB_ID);
    dialogUrlParam.append('redirect_uri', GITHUB_REDIRECT_URI);
    dialogUrlParam.append('allow_signup', 'true');
    dialogUrlParam.append('state', state);
    dialogUrlParam.append('scope', scopeAsParam(scopes));
    const url = decodeURIComponent(dialogUrl.toString());
    openDialog(url).then((oauthCode) => {
      getAccessToken(oauthCode);
    });
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentComment(event.target.value);
  };

  const handleClick = useCallback(() => {
    if (id && token && currentComment.trim().length > 0) {
      axios
        .post('/api/comment', {
          id,
          token,
          comment: currentComment,
        })
        .then((res) => {
          if (res.data) {
            setRefresh((prev) => prev + 1);
          }
        });
    }
    setCurrentComment('');
  }, [currentComment, id, token]);

  return (
    <>
      {commentList?.map((comment) => {
        return (
          <div
            key={comment.id}
            className="flex flex-col p-5 border rounded-lg border-border-primary"
          >
            <div className="flex justify-end gap-5 pr-1">
              <p className="p-2 rounded-md ">
                {moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </p>
              <p className="p-2 rounded-md ">{comment.author_association}</p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:items-start sm:flex-row">
              <div>
                <img
                  src={comment.user.avatar_url}
                  alt="avatar"
                  className="rounded-full w-14"
                  width={150}
                  height={150}
                />
                {comment.user.login}
              </div>
              <div
                id="comment"
                className="relative w-full p-5 border rounded-lg before:!hidden before:sm:block border-border-primary bg-background-codeblock"
              >
                <MDXRemote
                  {...comment.body}
                  components={{
                    ...customMDX.components,
                    img: ({ className, ...props }: ComponentProps<'img'>) => (
                      <img
                        className="rounded-lg shadow-xl "
                        {...props}
                        alt="comment"
                      />
                    ),
                    nav: ({ className, children, ...props }) => (
                      <nav className={'hidden'} {...props}>
                        {children}
                      </nav>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      {token ? (
        <div className="flex flex-col gap-5 p-5 mt-5 border rounded-lg border-border-primary">
          <textarea
            className="p-2 border rounded-md outline outline-primary border-border-primary"
            value={currentComment}
            onChange={handleTextChange}
          ></textarea>
          <div className="flex items-center justify-end gap-4">
            <button
              className="px-2 py-1 rounded-md bg-[#238636] text-white shadow-md"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClick}
            >
              Comment
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full py-5 sm:justify-end">
          <button
            onClick={oauthGithub}
            className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#238636] text-white shadow-md"
          >
            <FaGithub /> Login to comment
          </button>
        </div>
      )}
    </>
  );
};
