import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

export const metadata: Metadata = {
  title: {
    default: 'Comparador de Precios de Medicamentos',
    template: '%s | Comparador de Medicamentos',
  },
  description:
    'Compara precios de medicamentos por principio activo. Encuentra el mejor precio en diferentes farmacias.',
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Comparador de Medicamentos',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
