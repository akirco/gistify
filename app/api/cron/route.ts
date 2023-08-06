import { NextResponse, NextRequest } from 'next/server';

import {
  createArticlesTable,
  insertArticlesData,
  dropArticlesTable,
} from '@/libs/utils/postgres';

export async function GET(req: NextRequest) {
  try {
    await createArticlesTable();
    await insertArticlesData();
    return NextResponse.json({
      CODE: 200,
      MESSAGE: 'DONE',
    });
  } catch (error: any) {
    console.log('CRON JOB ERROR:\n', error.message);
    return NextResponse.json({
      CODE: 405,
      MESSAGE: 'THE REQUEST PARAMS IS MISSING',
    });
  }
}
