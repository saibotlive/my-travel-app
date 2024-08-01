'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '@/lib/features/toastSlice';
import { useGetDestinationsForFolderQuery, useUpvoteDestinationMutation } from '@/lib/features/apiSlice';
import { Destination } from '@/types/index';
import { Button, Heading, IconButton } from '@radix-ui/themes';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

interface Props {
  folderId: number;
  initialFolderName: string;
  initialDestinations: Destination[];
}

const FolderContent = ({ folderId, initialFolderName, initialDestinations = [] }: Props) => {
  const [destinations, setDestinations] = useState<Destination[]>(
    Array.isArray(initialDestinations) ? initialDestinations : []
  );
  const [folderName, setFolderName] = useState<string>(initialFolderName);
  const [upvoteDestination] = useUpvoteDestinationMutation();
  const dispatch = useDispatch();

  // Client-side fetch if no initial data
  const { data: clientFetched, refetch } = useGetDestinationsForFolderQuery(folderId, {
    skip: initialDestinations.length > 0,
  });

  useEffect(() => {
    if (clientFetched?.destinations) {
      setDestinations(clientFetched?.destinations);
    }
    if (clientFetched?.folderName) {
      setFolderName(clientFetched?.folderName);
    }
  }, [clientFetched]);

  const handleUpvote = async (destinationId: number, votes: number) => {
    try {
      await upvoteDestination(destinationId).unwrap();
      setDestinations((prevDestinations) =>
        prevDestinations.map((dest) => (dest.id === destinationId ? { ...dest, votes: dest.votes + 1 } : dest))
      );
      dispatch(showToast({ title: 'Success', description: 'Upvoted successfully' }));
    } catch (error) {
      dispatch(showToast({ title: 'Error', description: 'Failed to upvote' }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Heading as="h1" className="text-2xl font-bold mb-4">
        {folderName || 'Folder'}
      </Heading>
      <div className="grid grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <div key={destination.id} className="pb-4 relative overflow-hidden rounded-[11px]">
            <Image
              src={destination.image}
              alt={destination.name}
              width={250}
              height={180}
              className="h-auto w-full rounded-[11px]"
            />
            <Heading as="h3" className="mt-4 text-xl">
              {destination.name}
            </Heading>
            <Button
              color="gray"
              variant="soft"
              onClick={() => handleUpvote(destination.id, destination.votes)}
              className="flex mt-4 items-center gap-2 p-2 border border-solid border-gray-500 rounded-lg cursor-pointer"
            >
              <ArrowUpIcon />
              <span>{destination.votes}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderContent;
