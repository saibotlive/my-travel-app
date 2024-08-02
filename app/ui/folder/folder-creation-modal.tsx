'use client';

import { SyntheticEvent, useState } from 'react';
import { Button, Heading, Text } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

const FolderCreationModal = ({ onCreate }: { onCreate: (name: string, description: string) => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleCreateFolder = (event: SyntheticEvent) => {
    event.preventDefault();
    onCreate(name, description);
    setName('');
    setDescription('');
    setOpenModal(false);
  };

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Button
        onClick={() => setOpenModal(true)}
        color="gray"
        variant="soft"
        className="w-full aspect-square h-full flex flex-col justify-center rounded-[11px] cursor-pointer"
      >
        <PlusIcon fontSize={50} className="block w-16 h-16" />
        <Text as="p" className="text-base">
          Create new trip
        </Text>
      </Button>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 animate-overlayShow" />
        <Dialog.Content
          className={clsx(
            'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[450px] max-h-[85vh] overflow-y-auto',
            'animate-contentShow'
          )}
        >
          <Dialog.Title className="m-0 font-medium text-mauve-12 text-[17px]">Create new trip</Dialog.Title>
          <Dialog.Description className="my-4 text-mauve-11 text-[15px] leading-6">
            Fill in the details below to create a new trip.
          </Dialog.Description>
          <form onSubmit={handleCreateFolder}>
            <fieldset className="flex flex-col gap-5 mb-4">
              <label className="text-[15px] text-violet-11">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. Beach Trip"
                required
                className="rounded border p-2 text-[15px] text-violet-11 shadow-[0_0_0_1px_var(--violet-7)] h-[35px] focus:shadow-[0_0_0_2px_var(--violet-8)]"
              />
            </fieldset>
            <fieldset className="flex flex-col gap-5 mb-4">
              <label className="text-[15px]">Description (optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g. Our chill zone dedicated to all things beachy 🏝️"
                className="rounded border p-2 text-[15px] text-violet-11 shadow-[0_0_0_1px_var(--violet-7)] h-[35px] focus:shadow-[0_0_0_2px_var(--violet-8)]"
              />
            </fieldset>
            <div className="flex flex-row-reverse gap-4">
              <Button type="submit" className="flex-1 rounded p-4 bg-ring-color/50 bg-opacity-45 cursor-pointer">
                Create
              </Button>
              <Button
                color="gray"
                variant="outline"
                onClick={() => setOpenModal(false)}
                className="flex-1 rounded p-4 cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </form>
          <Dialog.Close asChild>
            <Button className="absolute top-2.5 right-2.5 flex items-center justify-center rounded-full w-[25px] h-[25px] text-violet-11 hover:bg-violet-4 focus:shadow-[0_0_0_2px_var(--violet-7)]">
              ✕
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FolderCreationModal;
