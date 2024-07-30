import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Folder } from '@/types/index';

export async function POST(request: Request) {
  try {
    const { name }: { name: string } = await request.json();
    const result = await sql<Folder>`INSERT INTO folders (name) VALUES (${name}) RETURNING id, name`;

    // Access the rows property
    const folders = result.rows;
    if (folders.length === 0) {
      throw new Error('Folder creation failed');
    }

    return NextResponse.json({ id: folders[0].id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating folder:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
