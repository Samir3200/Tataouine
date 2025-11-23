// Indique que ce composant utilise des fonctionnalités côté client (hooks React)
'use client';

// Importation des données JSON, du composant Image de Next.js et des hooks React
import saveursData from '../data/saveurs.json';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Saveurs() {
    // Récupération de la liste des saveurs depuis le fichier JSON
    const saveurs = saveursData.saveurs.itemssaveurs;
    
    // État pour stocker la saveur sélectionnée dans le modal (null = modal fermé)
    const [selectedSaveur, setSelectedSaveur] = useState<any | null>(null);
    
    // Référence au conteneur du carrousel pour contrôler le scroll
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    // État pour mettre en pause le défilement automatique (au survol ou clic)
    const [isPaused, setIsPaused] = useState(false);

    // Fonction pour formater la description en paragraphes structurés
    const formatDescription = (text: string) => {
        // Divise le texte par les marqueurs de sections (mot en majuscule suivi de " : ")
        const sections = text.split(/(?=[A-ZÀÉÈÊËÏÎÔÙÛÇ][a-zàâäæçéèêëïîôùûüÿœ\s]+\s*:\s*)/);
        // Filtre pour enlever les sections vides
        return sections.filter(s => s.trim().length > 0);
    };

    // Fonction pour ouvrir le modal avec les détails d'une saveur
    const openModal = (saveur: any) => {
        setSelectedSaveur(saveur);
        // Empêche le scroll de la page en arrière-plan quand le modal est ouvert
        document.body.style.overflow = 'hidden';
    };

    // Fonction pour fermer le modal
    const closeModal = () => {
        setSelectedSaveur(null);
        // Réactive le scroll de la page
        document.body.style.overflow = 'unset';
    };

    // Hook useEffect pour gérer le défilement automatique infini du carrousel
    useEffect(() => {
        const container = scrollContainerRef.current;
        // Si pas de conteneur ou si en pause, on sort de la fonction
        if (!container || isPaused) return;

        const scrollSpeed = 0.5; // Vitesse de défilement en pixels par frame
        let animationFrameId: number; // ID pour annuler l'animation si besoin

        // Fonction qui fait défiler le carrousel automatiquement
        const autoScroll = () => {
            if (container && !isPaused) {
                // Déplace le scroll vers la droite
                container.scrollLeft += scrollSpeed;

                // Calcul pour créer un effet de boucle infinie
                // Réinitialise au tiers quand on arrive aux deux tiers
                const maxScroll = container.scrollWidth / 3;
                if (container.scrollLeft >= maxScroll * 2) {
                    container.scrollLeft = maxScroll;
                }
            }
            // Continue l'animation à la prochaine frame
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        // Démarre l'animation
        animationFrameId = requestAnimationFrame(autoScroll);

        // Fonction de nettoyage : arrête l'animation quand le composant est démonté
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isPaused]); // Se relance quand isPaused change

    // Fonction pour faire défiler manuellement le carrousel (boutons gauche/droite)
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 420; // Distance de défilement = largeur d'une carte + espacement
            // Calcule la nouvelle position selon la direction
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
            // Anime le défilement vers la nouvelle position
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth' // Animation fluide
            });

            // Met en pause le défilement automatique pendant 3 secondes
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 3000);
        }
    };

    // Extrait toutes les catégories uniques des saveurs (non utilisé mais utile pour filtrer)
    const categories = [...new Set(saveurs.map(s => s.categorie))];

    return (
        <section className="w-full px-0 pt-32 pb-12">
            <div className="container mx-auto px-6">
                <h3 className="text-5xl font-bold text-center mb-6 text-yellow-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                    SAVEURS DE TATAOUINE
                </h3>
                <p className="text-center text-2xl font-bold mb-16 text-gray-700">
                    Découvrez les délices culinaires authentiques du sud tunisien, où chaque recette raconte une histoire de traditions et de partage.
                </p>
            </div>

            {/* Carrousel de saveurs */}
            <div className="relative">
                {/* Fondu gauche - plus doux et plus large */}
                <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-white via-white/60 via-white/30 to-transparent pointer-events-none z-10"></div>

                {/* Fondu droit - plus doux et plus large */}
                <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white via-white/60 via-white/30 to-transparent pointer-events-none z-10"></div>

                {/* Bouton pour défiler vers la gauche (positionné en absolu, centré verticalement) */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-yellow-900/70 hover:bg-yellow-900/90 text-white w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center backdrop-blur-sm"
                    aria-label="Précédent"
                >
                    {/* Icône flèche gauche SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Conteneur du carrousel : flex horizontal avec scroll automatique */}
                {/* ref permet de contrôler le scroll depuis JavaScript */}
                {/* onMouseEnter/Leave = met en pause le défilement automatique au survol */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-4 px-20 scroll-smooth hide-scrollbar"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Dupliquer les cartes pour un défilement infini */}
                    {[...saveurs, ...saveurs, ...saveurs].map((saveur, index) => (
                        <article
                            key={`${saveur.id}-${index}`}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-row min-h-[220px] w-[calc(33.333%-16px)] min-w-[380px] flex-shrink-0"
                        >
                            {saveur.images?.image1 && (
                                <div className="w-1/2 relative flex-shrink-0">
                                    <Image
                                        src={`/${saveur.images.image1}`}
                                        alt={saveur.images.alt1 || saveur.title || ''}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="text-sm font-semibold text-yellow-600 mb-2">
                                        {saveur.categorie}
                                    </div>
                                    <h5 className="text-2xl font-bold mb-4 text-yellow-800">
                                        {saveur.title}
                                    </h5>

                                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                                        {saveur.shortdescription}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => openModal(saveur)}
                                        className="bg-gradient-to-b from-yellow-700 to-yellow-900 text-white px-8 py-3 text-base rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all shadow-lg hover:shadow-xl active:shadow-inner cursor-pointer transform hover:-translate-y-1 active:translate-y-0"
                                    >
                                        Voir plus
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bouton Suivant */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-yellow-900/70 hover:bg-yellow-900/90 text-white w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center backdrop-blur-sm"
                    aria-label="Suivant"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Bouton vers la page des restaurants */}
            <div className="container mx-auto px-6 mt-16 flex justify-center">
                <a
                    href="/restaurants"
                    className="bg-gradient-to-b from-yellow-700 to-yellow-900 text-white px-12 py-4 text-xl font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all shadow-lg hover:shadow-xl active:shadow-inner transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 no-underline"
                    style={{ textDecoration: 'none', color: 'white' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    Découvrir les Restaurants de Tataouine
                </a>
            </div>

            {/* Modal Pop-up */}
            {selectedSaveur && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    style={{
                        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(252, 211, 77, 0.3) 100%)',
                        backdropFilter: 'blur(15px)'
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header avec design élégant */}
                        <div className="sticky top-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-gray-800 p-8 relative">
                            <div className="absolute inset-0 bg-white opacity-20"></div>
                            <h3 className="text-4xl font-bold text-center relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                                {selectedSaveur.title}
                            </h3>
                            <p className="text-center text-lg mt-2 relative z-10 opacity-90">
                                {selectedSaveur.categorie}
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
                            {/* Image */}
                            {selectedSaveur.images?.image1 && (
                                <div className="mb-8 flex justify-center">
                                    <div className="overflow-hidden rounded-xl shadow-lg max-w-xs w-full">
                                        <Image
                                            src={`/${selectedSaveur.images.image1}`}
                                            alt={selectedSaveur.images.alt1 || selectedSaveur.title || ''}
                                            width={1000}
                                            height={600}
                                            className="w-full h-auto object-contain"
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
                                    {formatDescription(selectedSaveur.description).map((section, idx) => {
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
