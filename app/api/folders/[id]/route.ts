import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { destinationIds } = await request.json();
    await sql`UPDATE destinations SET folder_id = NULL WHERE folder_id = ${params.id}`; // Clear previous assignments
    await Promise.all(
      destinationIds.map(
        (destinationId: number) => sql`UPDATE destinations SET folder_id = ${params.id} WHERE id = ${destinationId}`
      )
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
