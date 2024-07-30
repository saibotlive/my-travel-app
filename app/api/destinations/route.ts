import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query('SELECT * FROM destinations');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
