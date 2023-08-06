import { EdgeConfigClient } from '@vercel/edge-config';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

declare global {
  namespace globalThis {
    var edgeConfigClient: EdgeConfigClient;
  }
  namespace Gists {
    interface Gist {
      createdAt: string;
      description: string;
      fileCount: number;
      files: { [x: string]: GistFile };
      id: string;
      name: string;
      public: boolean;
      updatedAt: string;
      url: string;
    }
    interface GistFile {
      content: string;
      filename: string;
      language: string;
      raw_url: string;
      size: number;
      truncated: boolean;
      type: string;
    }
    interface GistResponse {
      created_at: string;
      description: string;
      files: { [x: string]: GistFile };
      html_url: string;
      id: string;
      public: boolean;
      updated_at: string;
      url: string;
    }
    interface GistsResponse extends Array<GistResponse> {}
  }
  namespace Blog {
    interface Profile {
      avatar: string;
      author: string;
      follow: string;
      twitter: string;
      github: string;
      codepen: string;
      bilibili: string;
      v2ex: string;
      juejin: string;
    }
    interface Article {
      createdat: string;
      description: string;
      filecount: number;
      files: string[];
      id: string;
      name: string;
      public: boolean;
      updatedat: string;
      url: string;
    }
    interface Articles extends Array<Article> {}
    interface Post {
      id: string;
      title: string;
      cover: string[];
      public: boolean;
      filecount: number;
      categories: string[];
      tags: string[];
      created: string;
      updated: string;
    }
    interface Posts extends Array<Post> {}
    interface Comment {
      url: string;
      id: number;
      user: {
        login: string;
        id: number;
        avatar_url: string;
        type: string;
        site_admin: boolean;
      };
      author_association: string;
      created_at: string;
      updated_at: string;
      body: string;
    }
    interface Comments extends Array<Comment> {}
    interface About {
      contact: {
        twitter: string;
        github: string;
        codepen: string;
        v2ex: string;
        reddit: string;
        email: string;
      };
      site: {
        description: string;
        features: string[];
        link: string;
      };
      technology: string[];
    }
    interface Project {
      title: string;
      description: string;
    }
    interface Projects extends Array<Project> {}
  }
}
