import ModalProvider from '@/components/modal-provider';
import { ThemeProvider } from '@/components/theme-provider';
import ToasterProvider from '@/components/toaster-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'LogiRecy',
  description: 'Detect Waste Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        {/* <CrispProvider /> */}
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
