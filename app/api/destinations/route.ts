// app/api/destinations/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const destinations = await sql`SELECT * FROM destinations;`;
    return NextResponse.json({ destinations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
