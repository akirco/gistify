import { NextResponse } from 'next/server';
import { getArticlesData } from '@/libs/utils/postgres';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageCount = searchParams.get('count');

  if (pageCount) {
    const articles = await getArticlesData(+pageCount);
    return NextResponse.json(articles);
  } else {
    return NextResponse.json({
      CODE: 405,
      MESSAGE: 'THE REQUEST PARAMS IS MISSING.',
    });
  }
}
