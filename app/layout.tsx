import { Metadata } from 'next';
import StoreProvider from '@/app/StoreProvider';
import { Theme } from '@radix-ui/themes';
import '@/app/ui/global.css';
import ToastComponent from './ui/toast';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Aside from './ui/aside';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Holiwise - Group Travel Planning',
  description: 'Group travel planning made easy. Save and vote on your favorite destinations.',
  openGraph: {
    title: 'Holiwise - Group Travel Planning',
    description: 'Group travel planning made easy. Save and vote on your favorite destinations.',
    url: 'https://my-travel-app-sigma.vercel.app',
    images: [
      {
        url: '/images/bali.webp',
        alt: 'Holiwise - Group Travel Planning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holiwise - Group Travel Planning',
    description: 'Group travel planning made easy. Save and vote on your favorite destinations.',
    images: [
      {
        url: '/images/bali.webp',
        alt: 'Holiwise - Group Travel Planning',
      },
    ],
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body className={`${jakarta.variable}`}>
        <StoreProvider>
          <Theme>
            <div className="flex min-h-full flex-col md:grid md:grid-cols-[64px_minmax(0,1fr)]">
              <Aside />
              <main>{children}</main>
            </div>
            <ToastComponent />
          </Theme>
        </StoreProvider>
      </body>
    </html>
  );
}
