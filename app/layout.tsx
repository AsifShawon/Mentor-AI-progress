import CursorAnimation from '@/components/CursorAnimation';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Teaching Assistant - Project Progress',
  description: 'Autonomous AI Teaching Assistant Platform - Development Progress and Milestones',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ cursor: 'none' }} className={inter.className}>{children}<CursorAnimation /></body>
    </html>
  );
}