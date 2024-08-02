import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const fetchCache = 'force-no-store';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    await sql`UPDATE destinations SET votes = votes + 1 WHERE id = ${id}`;
    return NextResponse.json({ message: 'Destination upvoted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error upvoting destination:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
