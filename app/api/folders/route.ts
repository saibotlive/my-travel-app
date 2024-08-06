import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Folder } from '@/types/index';

export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const result = await sql<Folder[]>`
      SELECT f.id, f.name, f.folder_key, f.recent_image, COALESCE(array_agg(d.image) FILTER (WHERE d.image IS NOT NULL), '{}') AS images
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
    const folderKey = name.toLowerCase().replace(/ /g, '-');

    // Check for duplicate folder names
    const existingFolder = await sql`
      SELECT id FROM folders WHERE folder_key = ${folderKey}
    `;
    if (existingFolder.rows.length > 0) {
      return NextResponse.json({ message: 'Folder name already exists.' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO folders (name, description, folder_key) VALUES (${name}, ${description}, ${folderKey}) 
      RETURNING id, name, description, folder_key, recent_image
    `;
    const newFolder = result.rows[0];
    return NextResponse.json(newFolder, { status: 201 });
  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
