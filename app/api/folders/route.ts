import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    const result = await pool.query('INSERT INTO folders (name) VALUES ($1) RETURNING id', [name]);
    return NextResponse.json({ id: result.rows[0].id }, { status: 200 });
  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
