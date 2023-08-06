import { NextResponse } from 'next/server';
import axios from 'axios';
import { Encrypt } from '@/libs/utils/crypto';

export async function POST(request: Request) {
  const githubOauth = 'https://github.com/login/oauth/access_token';
  const GITHUB_ID = process.env['GITHUB_ID'] as string;
  const GITHUB_SECRET = process.env['GITHUB_SECRET'] as string;
  const VERCEL_URL = process.env['VERCEL_URL'] as string;
  const { code } = await request.json();
  if (code) {
    try {
      const res = await axios.post<{
        access_token: string;
        token_type: 'bearer';
        scope: string;
      }>(
        githubOauth,
        {
          client_id: GITHUB_ID,
          client_secret: GITHUB_SECRET,
          code,
          redirect_uri: 'https://gistify.extrameta.cn/oauth',
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      return NextResponse.json({
        access_token: Encrypt(res.data.access_token),
        token_type: res.data.token_type,
        scope: res.data.scope,
      });
    } catch (error: any) {
      return NextResponse.json({
        CODE: 500,
        MESSAGE: 'GITHUB ACCESStOKEN IS MISSING.',
      });
    }
  } else {
    return NextResponse.json({
      CODE: 405,
      MESSAGE: 'THE CODE IS MISSING.',
    });
  }
}
