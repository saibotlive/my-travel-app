import FolderContent from '@/app/ui/folder/content';
import { Destination } from '@/types/index';

interface Props {
  initialDestinations: Destination[];
}

export const revalidate = 0;

async function getData(endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Replace with your deployment URL or use environment variable

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { folderKey: string } }) {
  const { folderKey } = params;
  const resp = await getData(`/api/folders/${folderKey}`);
  return {
    title: `${resp.folderName} - Holiwise`,
    description: resp.folderDescription,
    openGraph: {
      title: resp.folderName,
      description: resp.folderDescription,
      images: [{ url: resp.folderImage, alt: resp.folderName }],
    },
  };
}

const FolderPage = async ({ params }: { params: { folderKey: string } }) => {
  const { folderKey } = params;
  const resp = await getData(`/api/folders/${folderKey}`);

  return (
    <FolderContent
      folderKey={resp.folderKey}
      folderName={resp.folderName}
      folderDescription={resp.folderDescription}
      initialDestinations={resp.destinations}
    />
  );
};

export default FolderPage;
