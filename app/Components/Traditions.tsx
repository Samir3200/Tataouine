'use client';

import accueilData from '../data/accueil.json';
import Image from 'next/image';
import { useState } from 'react';

export default function Traditions() {
  const traditions = accueilData.accueil.itemsaccueil;
  const [selectedTradition, setSelectedTradition] = useState<any | null>(null);

  const openModal = (tradition: any) => {
    setSelectedTradition(tradition);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedTradition(null);
    document.body.style.overflow = 'unset';
  };

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

          return (
            <article key={tradition.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              {tradition.images?.image1 && (
                <div className="w-full h-80 relative">
                  <Image
                    src={`/${tradition.images.image1}`}
                    alt={tradition.images.alt1 || tradition.title || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

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

      {/* Modal Pop-up */}
      {selectedTradition && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(139, 69, 19, 0.95) 50%, rgba(184, 134, 11, 0.95) 100%)',
            backdropFilter: 'blur(15px)'
          }}
          onClick={closeModal}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec design élégant */}
            <div className="sticky top-0 bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 text-white p-8 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <h3 className="text-4xl font-bold text-center relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedTradition.title}
              </h3>
              <button
                onClick={closeModal}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-yellow-900 hover:bg-gray-100 text-3xl font-bold transition-all hover:rotate-90 hover:scale-110 duration-300 z-10 shadow-lg"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
            </div>

            {/* Contenu avec scroll */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-8 bg-white">
              {/* Toutes les images en grille avec effet hover */}
              {selectedTradition.images && (
                <div className="grid grid-cols-2 gap-6 mb-8">
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
              )}

              {/* Séparateur décoratif */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
                <div className="w-2 h-2 bg-yellow-900 rounded-full"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
              </div>

              {/* Description complète avec style amélioré */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-inner">
                <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                  {selectedTradition.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
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
