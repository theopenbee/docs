import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.theopenbee.com',
  ),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
