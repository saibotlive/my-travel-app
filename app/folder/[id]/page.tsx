import FolderContent from '@/app/ui/folder/content';
import { Destination } from '@/types/index';

interface Props {
  initialDestinations: Destination[];
}

export const dynamic = 'force-dynamic'; // Enable dynamic data fetching

async function getData(endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Replace with your deployment URL or use environment variable

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
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
export async function generateMetadata({ params }: { params: { id: string } }) {
  const folderId = params.id;
  const resp = await getData(`/api/folders/${folderId}`);
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

const FolderPage = async ({ params }: { params: { id: string } }) => {
  const folderId = params.id;
  const resp = await getData(`/api/folders/${folderId}`);

  return (
    <FolderContent
      folderName={resp.folderName}
      folderDescription={resp.folderDescription}
      initialDestinations={resp.destinations}
    />
  );
};

export default FolderPage;
