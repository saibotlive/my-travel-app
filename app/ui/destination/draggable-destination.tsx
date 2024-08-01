import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Destination } from '@/types/index';
import Image from 'next/image';
import { Heading } from '@radix-ui/themes';

const DraggableDestination = ({ destination }: { destination: Destination }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: destination.id.toString(),
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab relative"
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
