import { useDroppable } from '@dnd-kit/core';
import DraggableDestination from '@/app/ui/destination/draggable-destination';
import { Destination } from '@/types/index';
import { Heading } from '@radix-ui/themes';

const DestinationList = ({ items = [] }: { items: Destination[] }) => {
  const { setNodeRef } = useDroppable({
    id: 'destinations',
  });

  return (
    <div className="mt-10">
      <Heading as="h2" id="saved-destinations">
        Saved Destinations
      </Heading>

      <div
        ref={setNodeRef}
        className="mt-6 grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5"
        aria-labelledby="saved-destinations"
      >
        {Array.isArray(items) &&
          items.map((destination) => <DraggableDestination key={destination.id} destination={destination} />)}
      </div>
    </div>
  );
};

export default DestinationList;
