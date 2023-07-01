import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider, NavMenu } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Quadro de',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="pt-br">
        <body
          className={`${inter.className} text-gray-100 bg-gray-500 min-h-screen`}
        >
          <NavMenu />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
