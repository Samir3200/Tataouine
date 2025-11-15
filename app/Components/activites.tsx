'use client';

import activitesData from '../data/activites.json';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Activites() {
  const activites = activitesData.activites.itemsactivites;
  const [selectedActivite, setSelectedActivite] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Auto-scroll pour le carrousel
  useEffect(() => {
    const carouselImages: string[] = [];
    const currentActivite = activites[0]; // Pour le Karting (première activité)
    
    if (currentActivite?.images) {
      for (let i = 2; i <= 7; i++) {
        const imageKey = `image${i}` as keyof typeof currentActivite.images;
        if (currentActivite.images[imageKey]) {
          carouselImages.push(currentActivite.images[imageKey] as string);
        }
      }
    }

    if (carouselImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
      }, 3000); // Change d'image toutes les 3 secondes

      return () => clearInterval(interval);
    }
  }, [activites]);

  // Fonction pour formater la description en paragraphes
  const formatDescription = (text: string) => {
    const sections = text.split(/(?=[A-ZÀÉÈÊËÏÎÔÙÛÇ][a-zàâäæçéèêëïîôùûüÿœ\s]+\s*:\s*)/);
    return sections.filter(s => s.trim().length > 0);
  };

  const openModal = (activite: any) => {
    setSelectedActivite(activite);
    setCurrentImageIndex(0); // Réinitialiser le carrousel
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedActivite(null);
    document.body.style.overflow = 'unset';
  };

  // Obtenir toutes les catégories uniques
  const categories = ['Tous', ...new Set(activites.map(a => a.categorie))];

  // Filtrer les activités selon la catégorie sélectionnée
  const filteredActivites = selectedCategory === 'Tous' 
    ? activites 
    : activites.filter(a => a.categorie === selectedCategory);

  return (
    <section className="container mx-auto px-6 pt-32 pb-12">
      {/* Bouton retour */}
      <div className="mb-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl cursor-pointer font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour à l'Accueil
        </a>
      </div>

      <h3 className="text-5xl font-bold text-center mb-6 text-yellow-900" style={{ fontFamily: 'Playfair Display, serif' }}>
        ACTIVITÉS À TATAOUINE
      </h3>
      <p className="text-center text-2xl font-bold mb-12 text-gray-700">
        Découvrez les meilleures activités de loisirs et de détente à Tataouine et ses environs.
      </p>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all cursor-pointer ${
              selectedCategory === category
                ? 'bg-yellow-900 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grille des activités */}
      <div className="space-y-8">
        {filteredActivites.map((activite) => {
          // Récupérer les images du carrousel (image2 à image7)
          const carouselImages: string[] = [];
          if (activite.images) {
            for (let i = 2; i <= 7; i++) {
              const imageKey = `image${i}` as keyof typeof activite.images;
              if (activite.images[imageKey]) {
                carouselImages.push(activite.images[imageKey] as string);
              }
            }
          }

          return (
            <div key={activite.id} className="flex flex-col lg:flex-row gap-8">
              {/* Card de l'activité */}
              <article className={`bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col border-2 border-orange-200 ${carouselImages.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                {activite.images?.image1 && (
                  <div className="relative h-56">
                    <Image
                      src={`/${activite.images.image1}`}
                      alt={activite.images.alt1 || activite.title || ''}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm font-semibold text-yellow-600 mb-2">
                    {activite.categorie}
                  </div>
                  <h5 className="text-2xl font-bold mb-4 text-yellow-800">
                    {activite.title}
                  </h5>

                  <p className="text-base text-gray-700 leading-relaxed mb-4 flex-grow">
                    {activite.shortdescription}
                  </p>

                  <div className="mt-auto flex justify-center">
                    <button
                      onClick={() => openModal(activite)}
                      className="bg-gradient-to-b from-yellow-700 to-yellow-900 text-white px-8 py-3 text-base rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all shadow-lg hover:shadow-xl active:shadow-inner cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
                    >
                      Voir plus
                    </button>
                  </div>
                </div>
              </article>

              {/* Carrousel à côté de la card */}
              {carouselImages.length > 0 && (
                <div className="lg:w-1/2 bg-gray-100 rounded-lg shadow-lg p-6 relative flex items-center justify-center overflow-hidden">
                  <div className="w-full">
                    <div className="relative h-96 overflow-hidden rounded-lg mb-4">
                      <div
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{
                          transform: `translateX(-${(currentImageIndex % carouselImages.length) * 100}%)`
                        }}
                      >
                        {carouselImages.map((img, idx) => (
                          <div key={idx} className="relative min-w-full h-full flex-shrink-0">
                            <Image
                              src={`/${img}`}
                              alt={`${activite.title} - Image ${idx + 2}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Boutons de navigation */}
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                        className="w-12 h-12 bg-white hover:bg-gray-50 text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center font-bold text-2xl"
                        aria-label="Image précédente"
                      >
                        ‹
                      </button>

                      {/* Indicateurs */}
                      <div className="flex gap-2">
                        {carouselImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              idx === currentImageIndex % carouselImages.length
                                ? 'bg-yellow-600 w-8'
                                : 'bg-gray-400 w-2 hover:bg-gray-500'
                            }`}
                            aria-label={`Aller à l'image ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)}
                        className="w-12 h-12 bg-white hover:bg-gray-50 text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center font-bold text-2xl"
                        aria-label="Image suivante"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Pop-up */}
      {selectedActivite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(252, 211, 77, 0.3) 100%)',
            backdropFilter: 'blur(15px)'
          }}
          onClick={closeModal}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-gray-800 p-8 relative">
              <div className="absolute inset-0 bg-white opacity-20"></div>
              <h3 className="text-4xl font-bold text-center relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedActivite.title}
              </h3>
              <p className="text-center text-lg mt-2 relative z-10 opacity-90">
                {selectedActivite.categorie}
              </p>
              <button
                onClick={closeModal}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-100 text-3xl font-bold transition-all hover:rotate-90 hover:scale-110 duration-300 z-10 shadow-lg"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-30"></div>
            </div>

            {/* Contenu avec scroll */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-8 bg-white hide-scrollbar">
              <div className="flex flex-row gap-8">
                {/* Image à gauche */}
                {selectedActivite.images?.image1 && (
                  <div className="w-1/2 flex-shrink-0">
                    <div className="rounded-xl shadow-lg sticky top-0 bg-gray-100 p-4">
                      <Image
                        src={`/${selectedActivite.images.image1}`}
                        alt={selectedActivite.images.alt1 || selectedActivite.title || ''}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Coordonnées à droite */}
                <div className="w-1/2 flex flex-col gap-6">
                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      Coordonnées
                    </h4>
                    
                    {selectedActivite.Adresse && (
                      <div className="bg-white p-3 rounded-lg mb-3 shadow-sm">
                        <div className="flex items-start gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-gray-700 mb-1">Adresse</p>
                            {selectedActivite.Lienadresse ? (
                              <a 
                                href={selectedActivite.Lienadresse} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-black hover:text-yellow-700 transition-colors underline"
                              >
                                {selectedActivite.Adresse}
                              </a>
                            ) : (
                              <p className="text-sm text-black">{selectedActivite.Adresse}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedActivite.Téléphone && (
                      <div className="bg-white p-3 rounded-lg mb-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-700 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-gray-700 mb-1">Téléphone</p>
                            <a href={`tel:${selectedActivite.Téléphone}`} className="text-sm text-black hover:text-yellow-700 transition-colors">
                              {selectedActivite.Téléphone}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Réseaux sociaux */}
                    {(selectedActivite['lien facebook'] || selectedActivite['lien tiktok']) && (
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="font-semibold text-sm text-gray-700 mb-3">Suivez-nous</p>
                        <div className="flex gap-3">
                          {selectedActivite['lien facebook'] && (
                            <a
                              href={selectedActivite['lien facebook']}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow hover:shadow-lg"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                              Facebook
                            </a>
                          )}
                          {selectedActivite['lien tiktok'] && (
                            <a
                              href={selectedActivite['lien tiktok']}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all shadow hover:shadow-lg"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                              </svg>
                              TikTok
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Séparateur */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
                <div className="w-2 h-2 bg-yellow-900 rounded-full"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
              </div>

              {/* Description complète */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 shadow-inner">
                <h4 className="text-2xl font-bold text-yellow-900 mb-4">À propos</h4>
                <div className="space-y-6">
                  {formatDescription(selectedActivite.description).map((section, idx) => {
                    const colonIndex = section.indexOf(':');
                    if (colonIndex > 0 && colonIndex < 100) {
                      const title = section.substring(0, colonIndex).trim();
                      const content = section.substring(colonIndex + 1).trim();
                      return (
                        <div key={idx} className="border-l-4 border-yellow-700 pl-4">
                          <h4 className="text-xl font-bold text-yellow-900 mb-2">{title}</h4>
                          <p className="text-base text-gray-800 leading-relaxed text-justify">{content}</p>
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="text-base text-gray-800 leading-relaxed text-justify">
                        {section.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
