import './globals.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata = {
  title: 'Tataouine - Traditions et Culture du Sud Tunisien',
  description: 'Découvrez Tataouine, ses ksour, traditions et festivals sahariens.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen text-gray-800 font-sans">
        {/* Image de fond fixe pour toutes les pages */}
        <div 
          className="fixed inset-0 -z-50"
          style={{
            backgroundImage: 'url(/image/desert.jpg)',
            backgroundSize: 'cover',
            marginTop: '15px',
            backgroundPosition: 'center bottom',
            backgroundAttachment: 'fixed',
            opacity: '0.15'
          }}
        />
        {/* Overlay pour améliorer la lisibilité */}
        <div className="fixed inset-0 -z-40 bg-gradient-to-b from-white/90 via-white/85 to-white/90" />
        
        <Header />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
