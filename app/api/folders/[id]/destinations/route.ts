import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

interface ExistingDestination {
  destination_id: number;
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const folderId = params.id;
    const { destinationIds } = await request.json();

    // Check if the destination is already in the folder
    const result = await sql<ExistingDestination[]>`
      SELECT destination_id
      FROM folder_destinations
      WHERE folder_id = ${folderId}
      AND destination_id = ANY(${destinationIds})
    `;

    // Type assertion for result.rows
    const existingDestinations = result.rows as unknown as ExistingDestination[];
    const existingIds = existingDestinations.map((d) => d.destination_id);
    const newDestinationIds = destinationIds.filter((id: number) => !existingIds.includes(id));

    if (newDestinationIds.length === 0) {
      return NextResponse.json({ message: 'Destination Already exists in the folder.' }, { status: 400 });
    }

    // Insert new destinations into the join table
    for (const destinationId of newDestinationIds) {
      await sql`
        INSERT INTO folder_destinations (folder_id, destination_id) 
        VALUES (${folderId}, ${destinationId}) 
        ON CONFLICT DO NOTHING
      `;
    }

    // Update folder's recent image
    const recentImageResult = await sql`
      SELECT image
      FROM destinations
      WHERE id = ANY(${destinationIds})
      ORDER BY id DESC
      LIMIT 1
    `;
    const recentImage = recentImageResult.rows[0]?.image || '';

    await sql`
      UPDATE folders
      SET recent_image = ${recentImage}
      WHERE id = ${folderId}
    `;

    return NextResponse.json({ message: 'Destinations added to folder successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating folder:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
