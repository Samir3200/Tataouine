'use client';

import restaurantsData from '../data/restaurants.json';
import Image from 'next/image';
import { useState } from 'react';

export default function Restaurants() {
  const restaurants = restaurantsData.restaurants.itemsrestaurants;
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  // Fonction pour formater la description en paragraphes
  const formatDescription = (text: string) => {
    const sections = text.split(/(?=[A-ZÀÉÈÊËÏÎÔÙÛÇ][a-zàâäæçéèêëïîôùûüÿœ\s]+\s*:\s*)/);
    return sections.filter(s => s.trim().length > 0);
  };

  const openModal = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
    document.body.style.overflow = 'unset';
  };

  // Obtenir toutes les catégories uniques
  const categories = ['Tous', ...new Set(restaurants.map(r => r.categorie))];

  // Filtrer les restaurants selon la catégorie sélectionnée
  const filteredRestaurants = selectedCategory === 'Tous' 
    ? restaurants 
    : restaurants.filter(r => r.categorie === selectedCategory);

  return (
    <section className="container mx-auto px-6 pt-32 pb-12">
      {/* Bouton retour */}
      <div className="mb-8">
        <a
          href="/saveurs"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-800 px-6 py-3 rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl cursor-pointer font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour à Saveurs
        </a>
      </div>

      <h3 className="text-5xl font-bold text-center mb-6 text-yellow-900" style={{ fontFamily: 'Playfair Display, serif' }}>
        RESTAURANTS DE TATAOUINE
      </h3>
      <p className="text-center text-2xl font-bold mb-12 text-gray-700">
        Découvrez les meilleures adresses culinaires de la ville, des restaurants traditionnels aux pizzerias et pâtisseries.
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

      {/* Grille des restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <article 
            key={restaurant.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
          >
            {restaurant.images?.image1 && (
              <div className="relative h-64">
                <Image
                  src={`/${restaurant.images.image1}`}
                  alt={restaurant.images.alt1 || restaurant.title || ''}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
              <div className="text-sm font-semibold text-yellow-600 mb-2">
                {restaurant.categorie}
              </div>
              <h5 className="text-2xl font-bold mb-4 text-yellow-800">
                {restaurant.title}
              </h5>

              <p className="text-base text-gray-700 leading-relaxed mb-4 flex-grow">
                {restaurant.shortdescription}
              </p>

              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => openModal(restaurant)}
                  className="bg-gradient-to-b from-yellow-700 to-yellow-900 text-white px-8 py-3 text-base rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all shadow-lg hover:shadow-xl active:shadow-inner cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Pop-up */}
      {selectedRestaurant && (
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
            {/* Header avec design élégant */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-gray-800 p-8 relative">
              <div className="absolute inset-0 bg-white opacity-20"></div>
              <h3 className="text-4xl font-bold text-center relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedRestaurant.title}
              </h3>
              <p className="text-center text-lg mt-2 relative z-10 opacity-90">
                {selectedRestaurant.categorie}
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
              {/* Section supérieure: Image à gauche et coordonnées à droite */}
              <div className="flex flex-row gap-8 mb-8">
                {/* Image à gauche */}
                {selectedRestaurant.images?.image1 && (
                  <div className="w-1/2 flex-shrink-0">
                    <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={`/${selectedRestaurant.images.image1}`}
                        alt={selectedRestaurant.images.alt1 || selectedRestaurant.title || ''}
                        width={1000}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Coordonnées à droite */}
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-5 rounded-xl border-2 border-yellow-400 shadow-lg">
                    <h4 className="text-xl font-bold text-black mb-4 border-b-2 border-yellow-400 pb-2">Coordonnées</h4>
                    <div className="space-y-3">
                      {selectedRestaurant.Adresse && (
                        <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <div>
                            <p className="font-bold text-black text-sm mb-0.5">Adresse</p>
                            {selectedRestaurant.Lienadresse ? (
                              <a href={selectedRestaurant.Lienadresse} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 hover:underline font-medium text-sm">
                                {selectedRestaurant.Adresse}
                              </a>
                            ) : (
                              <p className="text-black font-medium text-sm">{selectedRestaurant.Adresse}</p>
                            )}
                          </div>
                        </div>
                      )}
                      {selectedRestaurant.Téléphone && (
                        <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          <div>
                            <p className="font-bold text-black text-sm mb-0.5">Téléphone</p>
                            <a href={`tel:${selectedRestaurant.Téléphone}`} className="text-black hover:text-gray-700 hover:underline font-medium text-sm">
                              {selectedRestaurant.Téléphone}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Séparateur décoratif */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
                <div className="w-2 h-2 bg-yellow-900 rounded-full"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-900 to-transparent"></div>
              </div>

              {/* Description complète en bas avec style amélioré */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 shadow-inner">
                <h4 className="text-2xl font-bold text-yellow-900 mb-4">Description</h4>
                <div className="space-y-6">
                  {formatDescription(selectedRestaurant.description).map((section, idx) => {
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
