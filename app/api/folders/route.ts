import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Folder } from '@/types/index';

export async function GET() {
  try {
    const result = await sql<Folder[]>`
      SELECT f.id, f.name, f.recent_image, COALESCE(array_agg(d.image) FILTER (WHERE d.image IS NOT NULL), '{}') AS images
      FROM folders f
      LEFT JOIN folder_destinations fd ON f.id = fd.folder_id
      LEFT JOIN destinations d ON fd.destination_id = d.id
      GROUP BY f.id
      ORDER BY f.id DESC
    `;

    return NextResponse.json({ folders: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching folders:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    // Check for duplicate folder names
    const existingFolder = await sql<Folder[]>`
      SELECT id FROM folders WHERE LOWER(name) = LOWER(${name})
    `;
    if (existingFolder.rows.length > 0) {
      return NextResponse.json({ error: 'Folder name already exists.' }, { status: 400 });
    }

    const result = await sql<Folder>`
      INSERT INTO folders (name, description) VALUES (${name}, ${description}) 
      RETURNING id, name, description, recent_image
    `;
    const newFolder = result.rows[0];
    return NextResponse.json(newFolder, { status: 201 });
  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
