import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Destination } from '@/types/index';

export async function GET() {
  try {
    const result = await sql<Destination[]>`SELECT * FROM destinations`;
    return NextResponse.json({ destinations: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
