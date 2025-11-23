# Guide de compréhension : Saveurs.tsx

## Structure générale du composant

### 1. **Imports et déclaration**
```tsx
'use client';  // Indique que ce composant utilise des fonctionnalités côté client (hooks React)
```
- `saveursData` : Données JSON contenant toutes les saveurs
- `Image` : Composant Next.js pour optimiser les images
- `useState, useRef, useEffect` : Hooks React pour gérer l'état et les effets

### 2. **États (useState)**
```tsx
const [selectedSaveur, setSelectedSaveur] = useState<any | null>(null);
```
- Stocke la saveur sélectionnée pour afficher le modal
- `null` = modal fermé, `objet` = modal ouvert avec cette saveur

```tsx
const [isPaused, setIsPaused] = useState(false);
```
- `true` = arrête le défilement automatique
- `false` = défilement automatique actif

### 3. **Référence (useRef)**
```tsx
const scrollContainerRef = useRef<HTMLDivElement>(null);
```
- Permet d'accéder directement au conteneur du carrousel pour contrôler le scroll

### 4. **Fonctions principales**

#### `formatDescription(text: string)`
- **But** : Divise une longue description en sections
- **Comment** : Cherche les titres de section (mot en majuscule suivi de " : ")
- **Retourne** : Tableau de sections

#### `openModal(saveur: any)`
- Ouvre le modal avec les détails de la saveur
- Bloque le scroll de la page arrière (`overflow: 'hidden'`)

#### `closeModal()`
- Ferme le modal
- Réactive le scroll de la page

#### `scroll(direction: 'left' | 'right')`
- **But** : Défile le carrousel manuellement (boutons ← →)
- **scrollAmount = 420** : Distance de défilement = largeur carte + espacement
- Met en pause le défilement automatique pendant 3 secondes

### 5. **Défilement automatique (useEffect)**

```tsx
useEffect(() => {
  // ... code de défilement
}, [isPaused]);
```

**Fonctionnement** :
1. **scrollSpeed = 0.5** : Vitesse en pixels par frame
2. **requestAnimationFrame** : Anime le scroll de manière fluide (60 fps)
3. **Effet de boucle infinie** :
   - Le tableau est triplé `[...saveurs, ...saveurs, ...saveurs]`
   - Quand on arrive à 2/3 du scroll, on revient à 1/3
   - Cela crée l'illusion d'un défilement sans fin
4. **Nettoyage** : `cancelAnimationFrame` arrête l'animation quand le composant est démonté

## Structure JSX (Interface)

### **Section principale**
```tsx
<section className="w-full px-0 pt-32 pb-12">
```
- `pt-32` = padding top pour éviter que le header fixe cache le contenu

### **Titre et sous-titre**
```tsx
<h3 style={{ fontFamily: 'Playfair Display, serif' }}>
  SAVEURS DE TATAOUINE
</h3>
```
- Police élégante pour le titre principal

### **Carrousel**

#### Structure en couches (z-index) :
1. **z-10** : Fondus gauche/droite (masquent la coupure des cartes)
2. **z-20** : Boutons ← →
3. **Conteneur** : Cartes qui défilent

#### **Effets de fondu**
```tsx
<div className="absolute ... bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10">
```
- `pointer-events-none` : Permet de cliquer à travers le fondu
- Crée un effet visuel qui masque les bords

#### **Boutons de navigation**
```tsx
<button onClick={() => scroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 ...">
```
- Positionnés en absolu, centrés verticalement
- `backdrop-blur-sm` : Effet de flou derrière le bouton

#### **Conteneur du carrousel**
```tsx
<div 
  ref={scrollContainerRef}
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
```
- **ref** : Permet de contrôler le scroll en JavaScript
- **onMouseEnter/Leave** : Pause le défilement au survol de la souris

#### **Cartes des saveurs**
```tsx
{[...saveurs, ...saveurs, ...saveurs].map((saveur, index) => (
  <article key={`${saveur.id}-${index}`} ...>
```
- **Triple le tableau** pour créer l'effet de boucle infinie
- **key unique** : Important pour React (id + index)
- **flex-shrink-0** : Empêche la carte de rétrécir

**Structure d'une carte** :
- **50% gauche** : Image (object-cover remplit l'espace)
- **50% droite** : Texte (catégorie, titre, description courte, bouton)

### **Modal (Pop-up)**

#### **Overlay**
```tsx
<div className="fixed inset-0 z-50 ... backdrop-filter: 'blur(15px)'" onClick={closeModal}>
```
- `fixed inset-0` : Couvre tout l'écran
- `z-50` : Au-dessus de tout
- `backdrop-filter: blur` : Flou de l'arrière-plan
- `onClick={closeModal}` : Ferme quand on clique en dehors

#### **Contenu du modal**
```tsx
<div onClick={(e) => e.stopPropagation()}>
```
- `stopPropagation()` : Empêche la fermeture quand on clique à l'intérieur

**Sections du modal** :
1. **Header** : Titre + bouton ×
2. **Image** : Grande image de la saveur
3. **Séparateur décoratif** : Ligne avec point central
4. **Description** : Formatée en sections avec bordure gauche

### **Styles CSS personnalisés**

```jsx
<style jsx>{`
  @keyframes fadeIn { ... }
  @keyframes scaleIn { ... }
  .hide-scrollbar { ... }
`}</style>
```

- **fadeIn** : Animation d'apparition (opacité 0 → 1)
- **scaleIn** : Animation de zoom (échelle 0.9 → 1)
- **hide-scrollbar** : Cache la barre de scroll mais garde le scroll fonctionnel

## Concepts clés à retenir

1. **useRef** : Accès direct aux éléments DOM
2. **useEffect** : Exécute du code après le rendu (ici : animation)
3. **requestAnimationFrame** : Animations fluides (60 fps)
4. **Boucle infinie** : Tripler le tableau + réinitialiser au bon moment
5. **z-index** : Contrôle les couches d'affichage
6. **pointer-events-none** : Rend un élément transparent aux clics
7. **stopPropagation** : Empêche la propagation d'un événement
8. **Tailwind CSS** : Classes utilitaires pour le style rapide
