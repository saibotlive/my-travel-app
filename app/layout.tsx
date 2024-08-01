import Head from 'next/head';
import StoreProvider from '@/app/StoreProvider';
import { Theme } from '@radix-ui/themes';
import '@/app/ui/global.css';
import ToastComponent from './ui/toast';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en" className={`${jakarta.variable} ${jakarta.variable}`}>
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
        <body>
          <Theme>
            <main>{children}</main>
            <ToastComponent />
          </Theme>
        </body>
      </html>
    </StoreProvider>
  );
}
