'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '@/lib/features/toastSlice';
import { useUpvoteDestinationMutation } from '@/lib/features/apiSlice';
import { Destination } from '@/types/index';
import { Button, Heading, IconButton, Text } from '@radix-ui/themes';
import { ArrowLeftIcon, ThickArrowUpIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  folderName: string;
  folderDescription: string;
  initialDestinations: Destination[];
}

const FolderContent = ({ folderName, folderDescription, initialDestinations = [] }: Props) => {
  const [destinations, setDestinations] = useState<Destination[]>(
    Array.isArray(initialDestinations) ? initialDestinations : []
  );

  const [upvoteDestination] = useUpvoteDestinationMutation();
  const dispatch = useDispatch();

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
    <div className="container mx-auto p-4 grid gap-4">
      <Link href={'/'}>
        <IconButton className="cursor-pointer bg-transparent mb-2">
          <ArrowLeftIcon color="black" width={24} height={24} className="" />
        </IconButton>
      </Link>

      <Heading as="h1" className="text-2xl font-bold">
        {folderName || 'Folder'}
      </Heading>
      {folderDescription && (
        <Text as="p" className="">
          {folderDescription}
        </Text>
      )}
      {!destinations.length && (
        <Heading as="h2" className="w-full text-center">
          There aren't any destinations on this trip yet
        </Heading>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations.map((destination: Destination) => (
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
              <ThickArrowUpIcon className="text-black" />
              <span>{destination.votes}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderContent;
