import HomeContent from './ui/home/content';
import { Destination, Folder } from '@/types/index';

interface Props {
  initialDestinations: Destination[];
  initialFolders: Folder[];
}

async function getData(endpoint: string) {
  const baseUrl = process.env.BASE_URL || ''; // Replace with your deployment URL or use environment variable

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

export const dynamic = 'force-dynamic'; // Enable dynamic data fetching

const Home = async () => {
  const [destinationsResp, foldersResp] = await Promise.all([getData('/api/destinations'), getData('/api/folders')]);
  return <HomeContent initialDestinations={destinationsResp.destinations} initialFolders={foldersResp.folders} />;
};

export default Home;
