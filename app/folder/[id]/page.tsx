import FolderContent from '@/app/ui/folder/content';
import { Destination } from '@/types/index';

interface Props {
  initialDestinations: Destination[];
}

export const dynamic = 'force-dynamic'; // Enable dynamic data fetching

async function getData(endpoint: string) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Replace with your deployment URL or use environment variable

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

const FolderPage = async ({ params }: { params: { id: string } }) => {
  const folderId = params.id;
  const resp = await getData(`/api/folders/${folderId}`);

  console.log('xparamsDest', resp.destinations);
  return (
    <FolderContent
      folderId={parseInt(folderId)}
      initialFolderName={resp.folderName}
      initialDestinations={resp.destinations}
    />
  );
};

export default FolderPage;
