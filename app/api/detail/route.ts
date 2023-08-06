import { NextResponse } from 'next/server';
import { getGist } from '@/libs/gists/gists-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const gist = await getGist(id);
    return NextResponse.json(gist);
  } else {
    return NextResponse.json({
      CODE: 405,
      MESSAGE: 'THE REQUEST PARAMS IS MISSING.',
    });
  }
}
