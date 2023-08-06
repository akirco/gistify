import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { getComments } from '@/libs/gists/gists-api';
import { Decrypt } from '@/libs/utils/crypto';

export async function POST(request: Request) {
  const { id, token, comment } = await request.json();
  const octokit = new Octokit({
    auth: Decrypt(token),
  });
  const res = await octokit.gists.createComment({
    gist_id: id,
    body: comment,
  });
  return NextResponse.json(res);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({
      CODE: 405,
      MESSAGE: 'THE REQUEST PARAM `id` IS MISSING',
    });
  }
  const comments = await getComments(id);
  return NextResponse.json(comments);
}
