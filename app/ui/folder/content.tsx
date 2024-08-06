'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '@/lib/features/toastSlice';
import { Destination } from '@/types/index';
import { Button, Heading, IconButton, Text } from '@radix-ui/themes';
import { ArrowLeftIcon, ThickArrowUpIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useUpvoteDestinationMutation } from '@/lib/features/apiSlice';
import clsx from 'clsx';

interface Props {
  folderKey: string;
  folderName: string;
  folderDescription: string;
  initialDestinations: Destination[];
}

const FolderContent = ({ folderKey, folderName, folderDescription, initialDestinations = [] }: Props) => {
  const [destinations, setDestinations] = useState<Destination[]>(
    Array.isArray(initialDestinations) ? initialDestinations : []
  );
  const [upvoteDestination] = useUpvoteDestinationMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedVotes = localStorage.getItem(`votes-${folderKey}`);
    if (savedVotes) {
      const parsedVotes = JSON.parse(savedVotes);
      setDestinations((prevDestinations) =>
        prevDestinations.map((dest) => ({
          ...dest,
          voted: parsedVotes.includes(dest.id),
        }))
      );
    }
  }, [folderKey]);

  const handleUpvote = async (destinationId: number, votes: number) => {
    const savedVotes = localStorage.getItem(`votes-${folderKey}`);
    const parsedVotes = savedVotes ? JSON.parse(savedVotes) : [];

    if (parsedVotes.includes(destinationId)) {
      dispatch(showToast({ title: 'Error', description: 'You have already voted for this destination.' }));
      return;
    }

    try {
      await upvoteDestination({ folderKey, destinationId }).unwrap();
      setDestinations((prevDestinations) =>
        prevDestinations.map((dest) =>
          dest.id === destinationId ? { ...dest, votes: dest.votes + 1, voted: true } : dest
        )
      );
      dispatch(showToast({ title: 'Success', description: 'Upvoted successfully' }));

      parsedVotes.push(destinationId);
      localStorage.setItem(`votes-${folderKey}`, JSON.stringify(parsedVotes));
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
              className={clsx(
                'flex mt-4 items-center gap-2 p-2 border border-solid border-gray-500 rounded-lg cursor-pointer',
                { 'cursor-default': destination.voted }
              )}
              disabled={destination.voted}
            >
              <ThickArrowUpIcon className={clsx('text-black', { 'text-gray-400': destination.voted })} />
              <span>{destination.votes}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderContent;
