import { NextResponse } from 'next/server';

export async function GET() {
  const api_url = 'https://api.likepoems.com/img/nature?type=json';
  const response = await (
    await fetch(api_url, {
      cache: 'no-cache',
    })
  ).json();
  return NextResponse.json({ url: response.url });
}
