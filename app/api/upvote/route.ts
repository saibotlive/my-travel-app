import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    await pool.query('UPDATE destinations SET votes = votes + 1 WHERE id = $1', [id]);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error upvoting destination:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
