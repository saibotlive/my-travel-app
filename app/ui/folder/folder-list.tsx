import { useDroppable } from '@dnd-kit/core';
import { Folder } from '@/types/index';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import clsx from 'clsx';
import { Heading, Text } from '@radix-ui/themes';

const DroppableFolder = ({ folder }: { folder: Folder }) => {
  const { setNodeRef } = useDroppable({
    id: `folder-${folder.id}`,
  });
  return (
    <Link href={`/folder/${folder.id}`}>
      <div ref={setNodeRef} className="pb-4 relative cursor-pointer" aria-labelledby={`folder-title-${folder.id}`}>
        <div className="relative overflow-hidden h-0 pb-[56.25%] border-3 rounded-[11px]">
          {folder.images && folder.images.length === 0 && (
            <>
              <Image
                width={250}
                height={180}
                src="/images/placeholder1.webp"
                alt="Placeholder"
                className="absolute inset-0 w-full h-full object-cover border border-white rounded-[11px]"
                style={{ zIndex: 0 }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-white">
                <Text as="p" className="text-center text-sm font-semibold">
                  There aren't any destinations on this board yet
                </Text>
              </div>
            </>
          )}
          {folder.images &&
            folder.images.slice(0, 3).map((image, index) => {
              const pos = `${(-100 / folder.images.length) * index}%`;
              return (
                <Image
                  key={index}
                  width={250}
                  height={180}
                  src={image}
                  alt={folder.name}
                  className={clsx(
                    'absolute inset-0 h-full object-cover border-[1px] border-white border-solid rounded-[11px]',
                    {
                      'w-full': index === 0,
                      'w-2/3': index === 1,
                      'w-1/3': index === 2,
                    }
                  )}
                />
              );
            })}
        </div>
        <Heading as="h3" id={`folder-title-${folder.id}`} className="text-lg mt-2">
          {folder.name}
        </Heading>
      </div>
    </Link>
  );
};

const FolderList = ({ folders }: { folders: Folder[] }) => {
  return (
    <>
      {folders.map((folder) => (
        <DroppableFolder key={folder.id} folder={folder} />
      ))}
    </>
  );
};

export default FolderList;
