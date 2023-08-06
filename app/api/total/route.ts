import { NextResponse } from 'next/server';
import { getArticlesCount } from '@/libs/utils/postgres';

export async function GET() {
  const count = await getArticlesCount();
  if (count) {
    return NextResponse.json({ count });
  }
}
