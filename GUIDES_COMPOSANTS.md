# Guide de compréhension : Tous les composants

## 📋 Table des matières
1. [Header.tsx](#headertsx) - Navigation principale
2. [Footer.tsx](#footertsx) - Pied de page
3. [Hero.tsx](#herotsx) - Bannière d'accueil
4. [Restaurants.tsx](#restaurantstsx) - Liste des restaurants
5. [Activites.tsx](#activitestsx) - Liste des activités avec carrousel
6. [Saveurs.tsx](#saveurstsx) - Carrousel de saveurs (voir GUIDE_SAVEURS.md)

---

## Header.tsx
### 🎯 Rôle
Navigation principale fixe en haut de toutes les pages

### 🧩 Structure
```tsx
import Link from 'next/link';  // Composant Next.js pour navigation sans rechargement
import Image from 'next/image'; // Composant Next.js pour images optimisées
```

### 🔑 Concepts clés

#### **Header fixe**
```tsx
className="fixed top-0 left-0 right-0 z-50"
```
- `fixed` : Reste en haut même au scroll
- `z-50` : Au-dessus de tout le contenu (z-index élevé)

#### **Logo positionné en absolu**
```tsx
<Link href="/" className="absolute left-4">
```
- `absolute left-4` : Positionné à gauche du header
- Contient le blason + texte "TATAOUINE"

#### **Navigation centrée**
```tsx
<nav>
  <ul className="flex space-x-16">
```
- `flex` : Aligne les liens horizontalement
- `space-x-16` : Espacement de 64px entre chaque lien

#### **Composant Link**
```tsx
<Link href="/services">Services de la ville</Link>
```
- Navigation côté client (pas de rechargement de page)
- Précharge automatiquement les pages au survol

---

## Footer.tsx
### 🎯 Rôle
Pied de page avec copyright et contact

### 🔑 Concepts clés

#### **Date dynamique**
```tsx
{new Date().getFullYear()}
```
- `new Date()` : Objet date JavaScript
- `.getFullYear()` : Extrait l'année courante (2025)
- S'actualise automatiquement chaque année

#### **Lien email**
```tsx
<a href="mailto:Samirelorf@yahoo.fr">
```
- `mailto:` : Ouvre le client email de l'utilisateur

---

## Hero.tsx
### 🎯 Rôle
Bannière visuelle avec image de fond

### 🔑 Concepts clés

#### **Image de fond**
```tsx
className="bg-[url('/hero.jpg')] bg-cover bg-center"
```
- `bg-[url('/hero.jpg')]` : Syntaxe Tailwind pour URL personnalisée
- `bg-cover` : Image couvre tout l'espace
- `bg-center` : Centrée horizontalement et verticalement

#### **Padding vertical**
```tsx
py-24
```
- Crée l'espace vertical (96px en haut et en bas)

---

## Restaurants.tsx
### 🎯 Rôle
Affiche une grille de restaurants avec filtres par catégorie et modal de détails

### 🧩 Structure similaire à Saveurs.tsx

#### **États (useState)**
```tsx
const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
```
- Stocke le restaurant sélectionné pour le modal

```tsx
const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
```
- Stocke la catégorie de filtre actuelle

### 🔑 Fonctions principales

#### **formatDescription(text: string)**
- Même principe que Saveurs.tsx
- Divise le texte en sections

#### **openModal / closeModal**
- Ouvre/ferme le modal
- Gère le scroll de la page

#### **Filtrage par catégorie**
```tsx
const categories = ['Tous', ...new Set(restaurants.map(r => r.categorie))];
```
- `new Set()` : Élimine les doublons
- `...` : Convertit le Set en tableau
- `['Tous', ...]` : Ajoute "Tous" au début

```tsx
const filteredRestaurants = selectedCategory === 'Tous' 
  ? restaurants 
  : restaurants.filter(r => r.categorie === selectedCategory);
```
- Opérateur ternaire : `condition ? valeur_si_vrai : valeur_si_faux`
- `.filter()` : Garde seulement les restaurants de la catégorie

### 📐 Layout

#### **Grille responsive**
```tsx
className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
```
- **Mobile** (grid-cols-1) : 1 colonne
- **Tablette** (md:grid-cols-3) : 3 colonnes
- **Desktop** (lg:grid-cols-5) : 5 colonnes
- `gap-6` : Espacement de 24px entre les cartes

#### **Carte flexible**
```tsx
className="flex flex-col"
```
- Les éléments s'empilent verticalement
- `flex-grow` sur la description : prend tout l'espace disponible
- `mt-auto` sur le bouton : pousse le bouton en bas

### 🎨 Modal (Pop-up)

#### **Structure en deux colonnes**
```tsx
<div className="flex flex-row gap-8">
  <div className="w-1/2">Image</div>
  <div className="w-1/2">Coordonnées</div>
</div>
```
- `flex-row` : Disposition horizontale
- `w-1/2` : Chaque colonne prend 50% de la largeur

#### **Overlay avec flou**
```tsx
style={{
  background: 'linear-gradient(...)',
  backdropFilter: 'blur(15px)'
}}
```
- `backdropFilter` : Applique un flou à l'arrière-plan
- `linear-gradient` : Dégradé de couleurs jaunes/dorées

#### **Empêcher la fermeture au clic intérieur**
```tsx
<div onClick={(e) => e.stopPropagation()}>
```
- `stopPropagation()` : Empêche l'événement de remonter au parent
- Sans ça, cliquer dans le modal le fermerait

#### **Bouton de fermeture animé**
```tsx
className="hover:rotate-90 hover:scale-110 duration-300"
```
- Rotation de 90° au survol
- Agrandissement de 10%
- Transition en 300ms

---

## Activites.tsx
### 🎯 Rôle
Affiche les activités avec carrousel d'images automatique à côté de chaque carte

### 🧩 Structure

#### **États**
```tsx
const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
```
- Index de l'image actuellement affichée dans le carrousel

### 🔑 Fonctionnalités spécifiques

#### **Défilement automatique du carrousel**
```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  }, 3000);
  
  return () => clearInterval(interval);
}, [activites]);
```

**Explication ligne par ligne** :
1. `setInterval` : Exécute une fonction répétitivement
2. `(prev) => (prev + 1)` : Incrémente l'index
3. `% carouselImages.length` : Revient à 0 après la dernière image (boucle)
4. `3000` : Toutes les 3 secondes (3000 millisecondes)
5. `clearInterval` : Arrête l'intervalle quand le composant est démonté

#### **Récupération des images du carrousel**
```tsx
const carouselImages: string[] = [];
if (activite.images) {
  for (let i = 2; i <= 7; i++) {
    const imageKey = `image${i}` as keyof typeof activite.images;
    if (activite.images[imageKey]) {
      carouselImages.push(activite.images[imageKey] as string);
    }
  }
}
```

**Explication** :
- Boucle de `image2` à `image7` (image1 = logo principal)
- `as keyof` : Type TypeScript pour accès dynamique aux propriétés
- Construit un tableau avec les URLs des images

### 📐 Layout horizontal (Card + Carrousel)

#### **Structure flexible**
```tsx
<div className="flex flex-col lg:flex-row gap-8">
  <article className={`lg:w-1/2 ...`}>Card</article>
  {carouselImages.length > 0 && <div className="lg:w-1/2">Carrousel</div>}
</div>
```

**Logique** :
- **Mobile** : Empilement vertical (flex-col)
- **Desktop** : Côte à côte (flex-row)
- **Largeur dynamique** : Si pas de carrousel, la card prend 100%

#### **Carrousel avec transition slide**
```tsx
<div
  className="flex transition-transform duration-700 ease-in-out"
  style={{
    transform: `translateX(-${(currentImageIndex % carouselImages.length) * 100}%)`
  }}
>
  {carouselImages.map((img, idx) => (
    <div className="relative min-w-full h-full flex-shrink-0">
      <Image src={`/${img}`} fill />
    </div>
  ))}
</div>
```

**Comment ça marche** :
1. **Toutes les images sont alignées horizontalement** (`flex`)
2. **min-w-full** : Chaque image fait 100% de largeur
3. **translateX** : Déplace le conteneur horizontalement
   - Index 0 : `translateX(0%)` → Image 1 visible
   - Index 1 : `translateX(-100%)` → Image 2 visible
   - Index 2 : `translateX(-200%)` → Image 3 visible
4. **transition-transform duration-700** : Animation fluide de 0.7s

#### **Boutons de navigation**
```tsx
<button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)}>
  ›
</button>
```
- Même logique que le défilement auto mais manuel

#### **Indicateurs (points)**
```tsx
{carouselImages.map((_, idx) => (
  <button
    onClick={() => setCurrentImageIndex(idx)}
    className={idx === currentImageIndex % carouselImages.length
      ? 'bg-yellow-600 w-8'  // Actif : allongé et jaune
      : 'bg-gray-400 w-2'    // Inactif : petit et gris
    }
  />
))}
```
- Un point par image
- Point actif = plus large et coloré
- Clic sur un point = va directement à cette image

### 🎨 Modal avec réseaux sociaux

#### **Affichage conditionnel**
```tsx
{(selectedActivite['lien facebook'] || selectedActivite['lien tiktok']) && (
  <div>Réseaux sociaux</div>
)}
```
- `||` : OU logique
- Affiche seulement si au moins un lien existe

#### **Boutons réseaux sociaux**
```tsx
<a
  href={selectedActivite['lien facebook']}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-600 ..."
>
  <svg>Icône Facebook</svg>
  Facebook
</a>
```
- `target="_blank"` : Ouvre dans un nouvel onglet
- `rel="noopener noreferrer"` : Sécurité (empêche l'accès à window.opener)
- Icônes SVG inline pour Facebook et TikTok

---

## 🎓 Concepts généraux React/Next.js

### **Composants**
- Fonctions qui retournent du JSX
- Réutilisables et modulaires

### **Props**
- Données passées d'un composant parent à enfant
- Exemple : `<Image src="/logo.png" alt="Logo" />`

### **État (useState)**
```tsx
const [valeur, setValeur] = useState(initial);
```
- `valeur` : Lecture de l'état
- `setValeur` : Fonction pour modifier l'état
- Quand l'état change, React re-rend le composant

### **Effets (useEffect)**
```tsx
useEffect(() => {
  // Code à exécuter
  return () => {
    // Nettoyage
  };
}, [dépendances]);
```
- S'exécute après chaque rendu
- `[dépendances]` : Se relance si ces valeurs changent
- Fonction de retour : Nettoyage (unmount)

### **Référence (useRef)**
```tsx
const ref = useRef(null);
<div ref={ref}>
```
- Accès direct au DOM
- Ne provoque pas de re-render quand modifié

### **Rendu conditionnel**
```tsx
{condition && <Composant />}
{condition ? <A /> : <B />}
```
- `&&` : Affiche si condition vraie
- `? :` : Affiche A ou B selon condition

### **Listes (map)**
```tsx
{items.map((item, index) => (
  <div key={item.id}>{item.name}</div>
))}
```
- `map` : Transforme un tableau en éléments JSX
- `key` : Obligatoire, aide React à identifier les éléments

### **Événements**
```tsx
<button onClick={() => handleClick()}>
```
- `onClick`, `onMouseEnter`, `onChange`, etc.
- Toujours en camelCase en React

### **Classes CSS conditionnelles**
```tsx
className={`base ${condition ? 'active' : 'inactive'}`}
```
- Template literal avec `${}`
- Permet de changer les classes dynamiquement

---

## 🎨 Tailwind CSS - Classes principales

### **Layout**
- `flex` : Conteneur flex
- `flex-col` : Direction verticale
- `flex-row` : Direction horizontale
- `grid` : Grille CSS
- `grid-cols-3` : 3 colonnes

### **Positionnement**
- `relative` : Position relative
- `absolute` : Position absolue
- `fixed` : Position fixe
- `sticky` : Reste visible au scroll

### **Tailles**
- `w-full` : Largeur 100%
- `w-1/2` : Largeur 50%
- `h-64` : Hauteur 256px
- `max-w-3xl` : Largeur max 768px

### **Espacement**
- `p-6` : Padding 24px
- `px-4` : Padding horizontal 16px
- `m-4` : Margin 16px
- `gap-6` : Espacement entre éléments flex/grid

### **Couleurs**
- `bg-yellow-900` : Fond jaune foncé
- `text-white` : Texte blanc
- `border-gray-200` : Bordure grise claire

### **Responsive**
- `md:grid-cols-3` : 3 colonnes sur tablette+
- `lg:w-1/2` : 50% largeur sur desktop

### **Interactions**
- `hover:bg-gray-100` : Au survol
- `active:shadow-inner` : Au clic
- `transition-all` : Anime tous les changements

### **Z-index**
- `z-10`, `z-20`, `z-50` : Contrôle l'ordre d'empilement

---

## 💡 Bonnes pratiques observées

1. **Composants réutilisables** : Chaque partie a son fichier
2. **Données séparées** : JSON dans `/data/`
3. **Nommage clair** : Variables et fonctions explicites
4. **Responsive design** : Mobile-first avec Tailwind
5. **Optimisation images** : Utilisation de `next/image`
6. **Navigation fluide** : `next/link` évite les rechargements
7. **Accessibilité** : `aria-label` sur les boutons d'icônes
8. **Animations CSS** : Transitions pour UX agréable
9. **Clean code** : Fonctions courtes et spécialisées
10. **TypeScript** : Typage pour éviter les erreurs
