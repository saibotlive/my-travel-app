import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { destinationIds } = await request.json();
    await pool.query('UPDATE destinations SET folder_id = NULL WHERE folder_id = $1', [params.id]); // Clear previous assignments
    await Promise.all(
      destinationIds.map((destinationId: number) =>
        pool.query('UPDATE destinations SET folder_id = $1 WHERE id = $2', [params.id, destinationId])
      )
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error updating folder destinations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
