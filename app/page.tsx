// app/page.tsx
import { GetServerSideProps } from 'next';
import { store } from '../lib/store';
import { apiSlice } from '@/lib/features/apiSlice';
import HomeContent from './ui/home/content';
import { Destination } from '@/types/index';

interface Props {
  initialDestinations: Destination[];
}

async function getData() {
  try {
    const res = await fetch('http://localhost:3010/api/destinations');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

export const dynamic = 'force-dynamic'; // Enable dynamic data fetching

const Home = async () => {
  const result = await getData();
  return <HomeContent initialDestinations={result} />;
};

export default Home;
