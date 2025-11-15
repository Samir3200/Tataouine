'use client';

import accueilData from '../data/accueil.json';
import attractionsData from '../data/attractions.json';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Accueil() {
  const traditions = accueilData.accueil.itemsaccueil;
  const attractions = attractionsData.attractions.itemsattractions;
  const [selectedTradition, setSelectedTradition] = useState<any | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<any | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{[key: number]: number}>({});

  // Fonction pour formater la description en paragraphes
  const formatDescription = (text: string) => {
    // Diviser le texte par les marqueurs de sections (mot suivi de " : ")
    const sections = text.split(/(?=[A-ZÀÉÈÊËÏÎÔÙÛÇ][a-zàâäæçéèêëïîôùûüÿœ\s]+\s*:\s*)/);
    return sections.filter(s => s.trim().length > 0);
  };

  const openModal = (tradition: any) => {
    setSelectedTradition(tradition);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedTradition(null);
    document.body.style.overflow = 'unset';
  };

  const openAttractionModal = (attraction: any) => {
    setSelectedAttraction(attraction);
    document.body.style.overflow = 'hidden';
  };

  const closeAttractionModal = () => {
    setSelectedAttraction(null);
    document.body.style.overflow = 'unset';
  };

  // Rotation automatique des images : 8 secondes d'affichage + 2 secondes de transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prev => {
        const newIndexes = { ...prev };
        traditions.forEach(tradition => {
          if (tradition.images) {
            const images = Object.keys(tradition.images).filter(key => key.startsWith('image'));
            const imageCount = images.length;
            if (imageCount > 1) {
              const currentIndex = prev[tradition.id] || 0;
              newIndexes[tradition.id] = (currentIndex + 1) % imageCount;
            }
          }
        });
        return newIndexes;
      });
    }, 5000); // 8 secondes d'affichage + 2 secondes de transition

    return () => clearInterval(interval);
  }, [traditions]);

  return (
    <section className="container mx-auto px-6 pt-0 pb-12">
      <h3 className="text-4xl font-bold text-center mb-10 text-yellow-900" style={{ fontFamily: 'Playfair Display, serif' }}>LES BONNES VIEILLES TRADITIONS</h3>
      <p className="text-center text-2xl font-bold mb-20 text-gray-700">
        Tataouine, située dans le sud de la Tunisie, est une région très riche en traditions culturelles,
        influencée par son histoire berbère, arabe et saharienne.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {traditions.map((tradition, index) => {
          const shortDescription = tradition.description.substring(0, 150) + '...';
          
          // Obtenir l'index actuel de l'image pour cette carte
          const currentImageIndex = currentImageIndexes[tradition.id] || 0;
          const imageKeys = tradition.images ? Object.keys(tradition.images).filter(key => key.startsWith('image')) : [];
          const currentImageKey = imageKeys[currentImageIndex] || 'image1';
          const currentAltKey = currentImageKey.replace('image', 'alt') as keyof typeof tradition.images;
          const images = tradition.images as any;

          return (
            <article key={tradition.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col max-w-sm mx-auto">
              <div className="w-full h-60 relative">
                {imageKeys.map((imgKey, imgIndex) => (
                  <div
                    key={imgKey}
                    className="absolute inset-0 transition-opacity duration-[5000ms] ease-in-out"
                    style={{
                      opacity: imgIndex === currentImageIndex ? 1 : 0,
                      zIndex: imgIndex === currentImageIndex ? 1 : 0
                    }}
                  >
                    {images?.[imgKey] && (
                      <Image
                        src={`/${images[imgKey]}`}
                        alt={images[imgKey.replace('image', 'alt')] || tradition.title || ''}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 text-yellow-800">
                  {index + 1}. {tradition.title}
                </h4>

                <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                  {shortDescription}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => openModal(tradition)}
                    className="bg-gradient-to-b from-yellow-700 to-yellow-900 text-white px-8 py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all shadow-lg hover:shadow-xl active:shadow-inner cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Section Attractions Locales */}
      <h3 className="text-4xl font-bold text-center mt-20 mb-10 text-yellow-900" style={{ fontFamily: 'Playfair Display, serif' }}>ATTRACTIONS LOCALES</h3>
      <p className="text-center text-2xl font-bold mb-20 text-gray-700">
        Découvrez ce qui fait de Tataouine une destination unique au cœur du désert tunisien.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 max-w-[1400px] mx-auto px-4">
        {attractions.map((attraction, index) => {
          const shortDescription = attraction.shortdescription || attraction.description.substring(0, 150) + '...';

          return (
            <article key={attraction.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-row min-h-[280px]">
              {attraction.images?.image1 && (
                <div className="w-1/2 relative flex-shrink-0">
                  <Image
                    src={`/${attraction.images.image1}`}
                    alt={attraction.images.alt1 || attraction.title || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold mb-4 text-yellow-800">
                    {attraction.title}
                  </h4>

                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    {shortDescription}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => openAttractionModal(attraction)}
                    className="bg-gradient-to-b from-yellow-700 to-yellow-900 text-white px-8 py-3 text-base rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all shadow-lg hover:shadow-xl active:shadow-inner cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Pop-up */}
      {selectedTradition && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(252, 211, 77, 0.3) 100%)',
            backdropFilter: 'blur(15px)'
          }}
          onClick={closeModal}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec design élégant */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-gray-800 p-8 relative">
              <div className="absolute inset-0 bg-white opacity-20"></div>
              <h3 className="text-4xl font-bold text-center relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedTradition.title}
              </h3>
              <button
                onClick={closeModal}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-100 text-3xl font-bold transition-all hover:rotate-90 hover:scale-110 duration-300 z-10 shadow-lg"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-30"></div>
            </div>

            {/* Contenu avec scroll */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] bg-white hide-scrollbar">
              <div className="flex flex-row gap-8 p-8">
                {/* Colonne gauche - Images */}
                {selectedTradition.images && (
                  <div className="w-[45%] flex-shrink-0">
                    <div className="grid grid-cols-2 gap-4 sticky top-0">
                      {selectedTradition.images.image1 && (
                        <div className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                          <Image
                            src={`/${selectedTradition.images.image1}`}
                            alt={selectedTradition.images.alt1 || selectedTradition.title || ''}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {selectedTradition.images.image2 && (
                        <div className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                          <Image
                            src={`/${selectedTradition.images.image2}`}
                            alt={selectedTradition.images.alt2 || selectedTradition.title || ''}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {selectedTradition.images.image3 && (
                        <div className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                          <Image
                            src={`/${selectedTradition.images.image3}`}
                            alt={selectedTradition.images.alt3 || selectedTradition.title || ''}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {selectedTradition.images.image4 && (
                        <div className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                          <Image
                            src={`/${selectedTradition.images.image4}`}
                            alt={selectedTradition.images.alt4 || selectedTradition.title || ''}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Colonne droite - Texte */}
                <div className="w-[55%] flex flex-col">
                  {/* Séparateur décoratif */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
                    <div className="w-2 h-2 bg-yellow-900 rounded-full"></div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
                  </div>

                  {/* Description complète avec style amélioré */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-inner">
                    <div className="text-lg text-gray-800 leading-relaxed space-y-4">
                      {formatDescription(selectedTradition.description).map((paragraph, idx) => (
                        <p key={idx} className="text-justify">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pop-up Attractions */}
      {selectedAttraction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(252, 211, 77, 0.3) 100%)',
            backdropFilter: 'blur(15px)'
          }}
          onClick={closeAttractionModal}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec design élégant */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-gray-800 p-8 relative">
              <div className="absolute inset-0 bg-white opacity-20"></div>
              <h3 className="text-4xl font-bold text-center relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedAttraction.title}
              </h3>
              <button
                onClick={closeAttractionModal}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-100 text-3xl font-bold transition-all hover:rotate-90 hover:scale-110 duration-300 z-10 shadow-lg"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-30"></div>
            </div>

            {/* Contenu avec scroll */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] pt-4 px-8 pb-8 bg-white hide-scrollbar">
              {/* Image */}
              {selectedAttraction.images?.image1 && (
                <div className="mb-1 max-w-2xl mx-auto">
                  <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={`/${selectedAttraction.images.image1}`}
                      alt={selectedAttraction.images.alt1 || selectedAttraction.title || ''}
                      width={1000}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Séparateur décoratif */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
                <div className="w-2 h-2 bg-yellow-900 rounded-full"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
              </div>

              {/* Description complète avec style amélioré */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 shadow-inner">
                <div className="space-y-6">
                  {formatDescription(selectedAttraction.description).map((section, idx) => {
                    // Extraire le titre de la section si présent (texte avant " : ")
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
      `}</style>
    </section>
  );
}
