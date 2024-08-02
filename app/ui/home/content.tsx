'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetDestinationsQuery,
  useUpdateFolderDestinationsMutation,
  useCreateFolderMutation,
  useGetFoldersQuery,
} from '@/lib/features/apiSlice';
import { Destination, Folder } from '@/types/index';
import FolderCreationModal from '@/app/ui/folder/folder-creation-modal';
import FolderList from '@/app/ui/folder/folder-list';
import DestinationList from '@/app/ui/destination/destination-list';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Heading } from '@radix-ui/themes';
import { showToast } from '@/lib/features/toastSlice';
import { useDispatch } from 'react-redux';

interface Props {
  initialDestinations: Destination[];
  initialFolders: Folder[];
}

const HomeContent = ({ initialDestinations = [], initialFolders = [] }: Props) => {
  const [items, setItems] = useState<Destination[]>(initialDestinations);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [updateFolderDestinations] = useUpdateFolderDestinationsMutation();
  const [createFolder] = useCreateFolderMutation();
  // const { data: clientFetchedFolders, error: folderError, refetch: refetchFolder } = useGetFoldersQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFolderCreate = async (name: string, description: string) => {
    try {
      const newFolder = await createFolder({ name, description }).unwrap();
      setFolders((prevFolders) => [newFolder, ...prevFolders]);
      dispatch(showToast({ title: 'Success', description: 'Folder created successfully.' }));
      router.refresh();
    } catch (error: any) {
      dispatch(showToast({ title: 'Error', description: error?.data?.message || 'Error creating folder' }));
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (over.id.startsWith('folder-')) {
      const movedItem = items.find((item) => item.id.toString() === active.id);

      const folderId = parseInt(over.id.replace('folder-', ''));
      const folder = folders.find((folder) => folder.id === folderId);

      if (folder && movedItem) {
        try {
          await updateFolderDestinations({ folderId, destinationIds: [movedItem.id] }).unwrap();
          dispatch(showToast({ title: 'Success', description: 'Destination successfully added to folder.' }));
          const updatedFolders: Folder[] = folders.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  images: folder.images ? [...folder.images, movedItem.image] : [movedItem.image],
                }
              : folder
          );
          setFolders(updatedFolders);
          router.refresh();
        } catch (error: any) {
          dispatch(showToast({ title: 'Error', description: error?.data?.message || 'Error creating folder' }));
        }
      }
    }
  };

  // if (destinationsError || folderError) {
  //   return <div>Error loading data</div>;
  // }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div className="container mx-auto p-4">
          <Heading as="h1" className="text-2xl font-bold mb-4">
            My Trips
          </Heading>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-5 ">
            <FolderCreationModal onCreate={handleFolderCreate} />
            <FolderList folders={folders} />
          </div>
          <DestinationList items={items} />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default HomeContent;
