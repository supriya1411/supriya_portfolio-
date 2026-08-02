import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VisitorTracker } from '@/components/VisitorTracker';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Supriya | Full-Stack Developer',
  description: 'Enterprise-grade applications engineered to scale.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Supriya' }],
  openGraph: {
    title: 'Supriya | Full-Stack Developer',
    description: 'Enterprise-grade applications engineered to scale.',
    url: 'https://supriyadev.example.com',
    siteName: 'Supriya Portfolio',
    images: [
      {
        url: 'https://supriyadev.example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Supriya Portfolio Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supriya | Full-Stack Developer',
    description: 'Enterprise-grade applications engineered to scale.',
    creator: '@supriyadev',
    images: ['https://supriyadev.example.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'system';
  
  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
      <head>
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <VisitorTracker />
        <div className="flex min-h-screen flex-col">
          <Navbar initialTheme={theme} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
