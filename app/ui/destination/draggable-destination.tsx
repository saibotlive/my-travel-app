import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Destination } from '@/types/index';
import Image from 'next/image';
import { Heading } from '@radix-ui/themes';
import clsx from 'clsx';

const DraggableDestination = ({ destination }: { destination: Destination }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: destination.id.toString(),
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Apply transition when not dragging
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab relative touch-none"
      role="listitem"
      aria-labelledby={`destination-title-${destination.id}`}
    >
      <div className="group w-full h-auto overflow-hidden rounded-[11px]">
        <Image
          width={250}
          height={180}
          src={destination.image}
          alt={`Image of ${destination.name}`}
          className="ease h-auto w-full transition-transform duration-500 group-hover:scale-105 rounded-[11px]"
        />
      </div>
      <Heading as="h4" id={`destination-title-${destination.id}`} className="mt-2 text-lg">
        {destination.name}
      </Heading>
    </div>
  );
};

export default DraggableDestination;
