export type Category = 'chemise' | 'pantalon' | 'chaussures' | 'cardigan';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  concept: string;
  images: string[];
  sizes: Size[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CHEMISE 01',
    category: 'chemise',
    price: 145,
    description: 'Coupe droite, coton japonais haute densité. Détail de couture invisible sur l\'épaule.',
    concept: 'La structure pure. Une pièce qui s\'efface pour laisser place à la silhouette.',
    images: [
      '/img/chemise_01.jpeg'
    ],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'PANTALON 04',
    category: 'pantalon',
    price: 180,
    description: 'Laine froide, coupe large structurée. Taille élastiquée dissimulée.',
    concept: 'Le mouvement architectural. Le vêtement suit la marche sans contrainte.',
    images: [
      '/img/pantalon_04.jpeg'
    ],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '3',
    name: 'CARDIGAN 02',
    category: 'cardigan',
    price: 210,
    description: 'Maille de cachemire et soie. Bordures franches.',
    concept: 'La protection silencieuse. Une texture qui dialogue avec la peau.',
    images: [
      '/img/cardigan_02.jpeg'
    ],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '9',
    name: 'CARDIGAN 01',
    category: 'cardigan',
    price: 190,
    description: 'Laine mérinos extra-fine. Coupe minimaliste sans boutons.',
    concept: 'La fluidité du geste. Un vêtement qui accompagne le corps.',
    images: [
      '/img/cardigan_01.jpeg'
    ],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '4',
    name: 'CHAUSSURES 01',
    category: 'chaussures',
    price: 320,
    description: 'Cuir mat, semelle gomme injectée. Sans lacets apparents.',
    concept: 'L\'ancrage minimal. Une marche sans bruit, une présence discrète.',
    images: [
      '/img/chaussures_01.jpeg'
    ],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '8',
    name: 'CHAUSSURES 02',
    category: 'chaussures',
    price: 340,
    description: 'Cuir lisse, silhouette affinée. Finitions artisanales.',
    concept: 'L\'élégance du vide. Une forme qui s\'adapte au pas.',
    images: [
      '/img/chaussures_02.jpeg'
    ],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '5',
    name: 'CHEMISE 02',
    category: 'chemise',
    price: 155,
    description: 'Col officier, lin noir. Boutonnage sous patte.',
    concept: 'L\'ombre portée. Une pièce qui absorbe la lumière.',
    images: [
      '/img/chemise_02.jpeg'
    ],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '7',
    name: 'CHEMISE 03',
    category: 'chemise',
    price: 165,
    description: 'Coton brossé, coupe oversize. Détails de finitions à la main.',
    concept: 'Le volume maîtrisé. Une présence qui s\'affirme par sa forme.',
    images: [
      '/img/chemise_03.jpeg'
    ],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '6',
    name: 'PANTALON 02',
    category: 'pantalon',
    price: 195,
    description: 'Gabardine de coton, coupe fuselée. Pinces inversées.',
    concept: 'La géométrie du corps. Une ligne tracée dans l\'espace.',
    images: [
      '/img/pantalon_02.jpeg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  }
];
