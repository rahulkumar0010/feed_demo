import './globals.css';
import { Inter } from 'next/font/google';
import TanstackProvider from '../lib/tanstackClient';
import ThemeToggle from '../components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Social Feed App',
  description: 'A mock social media app using Next.js 15',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900 bg-white text-black dark:text-white`}>
        <TanstackProvider>
          <ThemeToggle />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
