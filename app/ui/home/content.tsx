'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Link from 'next/link';
import { useGetDestinationsQuery, useUpdateFolderDestinationsMutation } from '@/lib/features/apiSlice';
import { Destination } from '@/types/index';

interface Props {
  initialDestinations: Destination[];
}

const HomeContent = ({ initialDestinations }: Props) => {
  const [items, setItems] = useState<Destination[]>(initialDestinations);
  const [updateFolderDestinations] = useUpdateFolderDestinationsMutation();

  // Client-side fetch if no initial data
  const { data: clientFetchedDestinations } = useGetDestinationsQuery(undefined, {
    skip: initialDestinations.length > 0,
  });

  useEffect(() => {
    if (clientFetchedDestinations) {
      setItems(clientFetchedDestinations);
    }
  }, [clientFetchedDestinations]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);

    // Update folder destinations in the backend
    updateFolderDestinations({
      folderId: parseInt(result.destination.droppableId),
      destinationIds: newItems.map((item) => item.id),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Destinations</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="destinations">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-3 gap-4"
              aria-labelledby="saved-destinations"
            >
              <h2 id="saved-destinations" className="sr-only text-red-300">
                Saved Destinations
              </h2>
              {items.map((destination, index) => (
                <Draggable key={destination.id} draggableId={destination.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border p-4"
                      role="listitem"
                      aria-labelledby={`destination-title-${destination.id}`}
                    >
                      <img
                        src={destination.image}
                        alt={`Image of ${destination.name}`}
                        className="w-full h-32 object-cover mb-2"
                      />
                      <h3 id={`destination-title-${destination.id}`} className="text-xl">
                        {destination.name}
                      </h3>
                      <Link href={`/folder/${destination.folder_id}`} className="text-blue-500 hover:underline">
                        View Folder
                      </Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default HomeContent;
