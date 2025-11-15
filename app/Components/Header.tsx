import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-[#D4AF37] text-white py-3 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-center px-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity absolute left-4">
          <Image 
            src="/image/blason.png" 
            alt="Blason de Tataouine" 
            width={40} 
            height={40}
            className="object-contain"
          />
          <h1 className="text-3xl font-bold">TATAOUINE</h1>
        </Link>
        <nav>
          <ul className="flex space-x-16 text-base">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li><Link href="/services" className="hover:underline">Services de la ville</Link></li>
            <li><Link href="/saveurs" className="hover:underline">Saveurs</Link></li>
            <li><a href="#" className="hover:underline">Hébergements</a></li>
            <li><Link href="/activites" className="hover:underline">Activités</Link></li>
             <li><Link href="/radio" className="hover:underline">Radio Tataouine</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
