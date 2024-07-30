import Head from 'next/head';
import StoreProvider from '@/app/StoreProvider';
import '@/app/ui/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <Head>
          <meta
            name="description"
            content="Group travel planning made easy. Save and vote on your favorite destinations."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>Holiwise - Group Travel Planning</title>
          <meta property="og:title" content="Holiwise - Group Travel Planning" />
          <meta
            property="og:description"
            content="Group travel planning made easy. Save and vote on your favorite destinations."
          />
          <meta property="og:image" content="/path/to/image.jpg" />
          <meta property="og:url" content="https://yourwebsite.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Holiwise - Group Travel Planning" />
          <meta
            name="twitter:description"
            content="Group travel planning made easy. Save and vote on your favorite destinations."
          />
          <meta name="twitter:image" content="/path/to/image.jpg" />
        </Head>
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
