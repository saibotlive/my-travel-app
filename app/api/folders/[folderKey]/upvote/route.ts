import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const fetchCache = 'force-no-store';

export async function POST(request: Request, { params }: { params: { folderKey: string } }) {
  try {
    const { destinationId } = await request.json();
    const { folderKey } = params;

    // Check if the folder and destination combination exists
    const result = await sql`
      SELECT fd.folder_id, fd.destination_id FROM folder_destinations fd
      JOIN folders f ON fd.folder_id = f.id
      WHERE f.folder_key = ${folderKey} AND fd.destination_id = ${destinationId}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Folder or destination not found' }, { status: 404 });
    }

    // Update the votes for the destination within the specific folder
    await sql`
      UPDATE folder_destinations
      SET votes = votes + 1
      WHERE folder_id = ${result.rows[0].folder_id} AND destination_id = ${destinationId}
    `;

    return NextResponse.json({ message: 'Destination upvoted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error upvoting destination:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
