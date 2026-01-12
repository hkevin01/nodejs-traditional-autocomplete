import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Node.js Traditional Autocomplete',
  description: 'Full-stack JavaScript development with traditional IntelliSense and autocomplete',
  keywords: ['Node.js', 'React', 'TypeScript', 'Traditional Autocomplete', 'IntelliSense'],
  authors: [{ name: 'Traditional Autocomplete Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-neutral-50 text-neutral-900`}>
        <div className="min-h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}