import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

interface FolderWithDestinations {
  folder_id: number;
  folder_name: string;
  folder_description: string;
  id: number | null;
  name: string | null;
  image: string | null;
  votes: number | null;
  created_at: string | null;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const folderId = params.id;
    const result = await sql<FolderWithDestinations[]>`
      SELECT f.id AS folder_id, f.name AS folder_name, f.description AS folder_description, d.id, d.name, d.image, d.votes, fd.created_at
      FROM folders f
      LEFT JOIN folder_destinations fd ON f.id = fd.folder_id
      LEFT JOIN destinations d ON fd.destination_id = d.id
      WHERE f.id = ${folderId}
      ORDER BY fd.created_at DESC
    `;

    // Ensure the result is in the expected format
    const rows = result.rows as unknown as FolderWithDestinations[];

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }

    const folderName = rows[0].folder_name;
    const folderDescription = rows[0].folder_description;
    const destinations = rows
      .map((row) => ({
        id: row.id,
        name: row.name,
        image: row.image,
        votes: row.votes,
      }))
      .filter((dest) => dest.id !== null); // Filter out null destinations

    return NextResponse.json({ folderId, folderName, folderDescription, destinations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching destinations for folder:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
