import {ImageSourcePropType} from 'react-native';
import imagePath from './imagePath';

export type Department = 'All' | 'Diwali' | 'Party' | 'Electronics' | 'Beauty';
export type Product = {
  id: string;
  name: string;
  unit: string;
  price: number;
  mrp: number;
  image: ImageSourcePropType;
  category: string;
  tags: string[];
  minutes?: number;
  badge?: string;
  offer?: string;
  details?: string[];
  related?: string;
  options?: {label: string; price: number}[];
  vegetarian?: boolean;
  rating?: string;
};
export type Category = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  color?: string;
  query?: string;
};
export const departments: Department[] = [
  'All',
  'Diwali',
  'Party',
  'Electronics',
  'Beauty',
];
export const products: Product[] = [
  {
    id: 'karwa-set',
    name: 'Happy Karwa Chauth Set MyRoyals',
    unit: '1 set',
    price: 349,
    mrp: 499,
    image: imagePath.karwaSet,
    category: 'Pooja',
    tags: ['All', 'Karwa Chauth', 'Pooja', 'Gifting'],
    details: ['3 pcs'],
    related: 'All Pooja Gifting',
    offer: '₹150 OFF',
  },
  {
    id: 'mehendi',
    name: 'Neha Gold Mehendi Cone',
    unit: '25 g',
    price: 15,
    mrp: 15,
    image: imagePath.mehendi,
    category: 'Beauty',
    tags: ['All', 'Beauty', 'Mehendi', 'Karwa Chauth'],
    related: 'All Shringar',
    options: [
      {label: '25 g', price: 15},
      {label: '50 g', price: 28},
    ],
  },
  {
    id: 'golden-karwa',
    name: 'Golden Karwa Chauth Set by ServDharm',
    unit: '1 set',
    price: 699,
    mrp: 1899,
    image: imagePath.goldenKarwa,
    category: 'Pooja',
    tags: ['All', 'Karwa Chauth', 'Pooja', 'Gifting'],
    details: ['3 pcs'],
    related: 'All Pooja Gifting',
    badge: 'Trending',
    offer: '₹1,200 OFF',
  },
  {
    id: 'jewellery',
    name: 'Gold-Plated Festive Jewellery Set',
    unit: '1 set',
    price: 2499,
    mrp: 6500,
    image: imagePath.jewellery,
    category: 'Fashion',
    tags: ['All', 'Karwa Chauth', 'Fashion', 'Gifting'],
    related: 'See more like this',
    details: ['Gold plated'],
  },
  {
    id: 'clay-diya',
    name: 'Clay Tulsi Diya Set by BB Backbenchers',
    unit: '4 pcs',
    price: 199,
    mrp: 499,
    image: imagePath.clayDiya,
    category: 'Diwali',
    tags: ['Diwali', 'Pooja', 'Decor', 'Party'],
    details: ['1.6″ × 1.6″'],
    related: 'See more like this',
  },
  {
    id: 'brass-diya',
    name: 'Kuber Brass Diya Set by Ekhasa',
    unit: '1 set',
    price: 399,
    mrp: 899,
    image: imagePath.brassDiya,
    category: 'Diwali',
    tags: ['Diwali', 'Pooja', 'Decor', 'Gifting'],
    details: ['2.2″', 'Brass'],
    minutes: 9,
    rating: '53',
    related: 'See more like this',
  },
  {
    id: 'painted-diya',
    name: 'Handmade Clay Diya Set by Bombay Greens',
    unit: '6 pcs',
    price: 249,
    mrp: 450,
    image: imagePath.paintedDiya,
    category: 'Diwali',
    tags: ['Diwali', 'Pooja', 'Decor', 'Party'],
    details: ['2.5″ × 2.5″ × 1.3″'],
    minutes: 9,
    related: 'See more like this',
  },
  {
    id: 'moti-chandan',
    name: 'Moti Chandan Luxury Soap',
    unit: '150 g',
    price: 67,
    mrp: 74,
    image: imagePath.motiChandan,
    category: 'Beauty',
    tags: ['Diwali', 'Beauty', 'Bath & Body'],
    details: ['Sandalwood'],
    badge: 'Trending',
    offer: 'Price Drop',
    rating: '1,606',
    related: 'All Bathing Soaps',
  },
  {
    id: 'moti-gulab',
    name: 'Moti Gulab Luxury Soap',
    unit: '150 g',
    price: 74,
    mrp: 82,
    image: imagePath.motiGulab,
    category: 'Beauty',
    tags: ['Diwali', 'Beauty', 'Bath & Body'],
    details: ['Rose'],
    badge: 'Trending',
    offer: '9% OFF on MRP',
    related: 'All Bathing Soaps',
  },
  {
    id: 'almond-oil',
    name: 'Bajaj Almond Drops Non-Sticky Hair Oil',
    unit: '95 ml',
    price: 89,
    mrp: 99,
    image: imagePath.almondOil,
    category: 'Beauty',
    tags: ['Diwali', 'Beauty', 'Hair'],
    details: ['Hair Fall'],
    rating: '23,215',
    related: 'See more like this',
  },
  {
    id: 'phool-gifts',
    name: 'Phool Festive Gift Box',
    unit: '1 box',
    price: 499,
    mrp: 699,
    image: imagePath.phoolGifts,
    category: 'Gifting',
    tags: ['Diwali', 'Gifting', 'Pooja'],
    related: 'See more like this',
  },
  {
    id: 'nutraj-gifts',
    name: 'Nutraj Premium Dry Fruit Gift Box',
    unit: '1 box',
    price: 649,
    mrp: 899,
    image: imagePath.nutrajGifts,
    category: 'Gifting',
    tags: ['Diwali', 'Gifting', 'Grocery', 'Sweets'],
    related: 'See more like this',
  },
  {
    id: 'coke',
    name: 'Coca-Cola Diet Coke Soft Drink',
    unit: '330 ml',
    price: 50,
    mrp: 50,
    image: imagePath.coke,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Party', 'Drinks'],
    details: ['Zero Sugar'],
    vegetarian: true,
    rating: '3.1 lac',
    options: [
      {label: '330 ml', price: 50},
      {label: 'Pack of 6', price: 290},
    ],
  },
  {
    id: 'lays',
    name: "Lay's West Indies Hot n Sweet Chilli Flavour Potato Chips",
    unit: '58 g',
    price: 25,
    mrp: 25,
    image: imagePath.lays,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Party', 'Snacks'],
    vegetarian: true,
    rating: '4.1 lac',
  },
  {
    id: 'milk',
    name: 'Gokul Full Cream Milk',
    unit: '500 ml',
    price: 39,
    mrp: 39,
    image: imagePath.milk,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Dairy'],
    vegetarian: true,
    details: ['Full Cream'],
    rating: '1.1 lac',
  },
  {
    id: 'onion',
    name: 'Onion (Kanda)',
    unit: '1 kg',
    price: 62,
    mrp: 78,
    image: imagePath.onion,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Vegetables'],
    options: [
      {label: '1 kg', price: 62},
      {label: '500 g', price: 34},
    ],
  },
  {
    id: 'popcorn',
    name: 'Act II Butter Popcorn - Ready to Eat',
    unit: '47 g',
    price: 25,
    mrp: 25,
    image: imagePath.popcorn,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Party', 'Snacks'],
    vegetarian: true,
    details: ['Ready To Eat'],
    rating: '1.7 lac',
  },
  {
    id: 'piknik',
    name: 'Piknik Classic Tomato Chilli Soya Sticks',
    unit: '50 g',
    price: 43,
    mrp: 60,
    image: imagePath.piknik,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Party', 'Snacks'],
    vegetarian: true,
    offer: '28% OFF on MRP',
    rating: '23,707',
  },
  {
    id: 'facewash',
    name: 'Ghar Soaps De-Tanning Magic Face Wash',
    unit: '100 ml',
    price: 230,
    mrp: 333,
    image: imagePath.facewash,
    category: 'Beauty',
    tags: ['Beauty', 'Bestsellers', 'Skin & Face'],
    offer: 'Price Drop',
    details: ['Tan Removal'],
  },
  {
    id: 'bread',
    name: 'Britannia Vitarich Sandwich White Bread',
    unit: '350 g',
    price: 40,
    mrp: 40,
    image: imagePath.bread,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Dairy'],
    vegetarian: true,
  },
  {
    id: 'chocolate',
    name: 'Amul Dark Chocolate Bar',
    unit: '35 g',
    price: 45,
    mrp: 55,
    image: imagePath.chocolate,
    category: 'Grocery',
    tags: ['Grocery', 'Bestsellers', 'Party', 'Sweets', 'Gifting'],
    vegetarian: true,
    rating: '1.8 lac',
  },
  {
    id: 'wallet',
    name: "Zouk Classic Men's Wallet",
    unit: '1 pc',
    price: 699,
    mrp: 1299,
    image: imagePath.wallet,
    category: 'Fashion',
    tags: ['Fashion', 'Gifting'],
  },
  {
    id: 'backpack',
    name: 'Zouk Laptop Backpack',
    unit: '1 pc',
    price: 1699,
    mrp: 2999,
    image: imagePath.backpack,
    category: 'Fashion',
    tags: ['Fashion', 'Gifting', 'Travel'],
  },
  {
    id: 'handbag',
    name: 'Zouk Ikat Handbag',
    unit: '1 pc',
    price: 1499,
    mrp: 2699,
    image: imagePath.handbag,
    category: 'Fashion',
    tags: ['Fashion', 'Gifting'],
    offer: 'Price Drop',
  },
  {
    id: 'camera',
    name: 'Instant Mini Camera',
    unit: '1 pc',
    price: 7499,
    mrp: 8499,
    image: imagePath.hobby,
    category: 'Electronics',
    tags: ['Electronics', 'Gifting', 'Hobby'],
  },
  {
    id: 'appliances',
    name: 'Home Appliances & Gadgets',
    unit: '1 pc',
    price: 2499,
    mrp: 3499,
    image: imagePath.appliances,
    category: 'Electronics',
    tags: ['Electronics', 'Diwali', 'Home'],
  },
  {
    id: 'oreo',
    name: 'Oreo Chocolate Cream Biscuits',
    unit: '120 g',
    price: 30,
    mrp: 30,
    image: imagePath.oreo,
    category: 'Grocery',
    tags: ['Grocery', 'Snacks', 'Bestsellers'],
    vegetarian: true,
  },
];
const category = (
  id: string,
  title: string,
  image: ImageSourcePropType,
  query = id,
  color = '#e5f3f3',
): Category => ({id, title, image, query, color});
export const festivalCategories = [
  category(
    'pooja',
    'Sargi &\nPooja Needs',
    imagePath.sargi,
    'Karwa Chauth',
    '#fff5d5',
  ),
  category(
    'festive-beauty',
    'Festive\nReady',
    imagePath.festiveBeauty,
    'Beauty',
    '#fff5d5',
  ),
  category(
    'gifting',
    'Gifting\nCorner',
    imagePath.gifting,
    'Gifting',
    '#fff5d5',
  ),
  category(
    'dry-fruits',
    'Dry Fruits\n& Sweets',
    imagePath.dryFruits,
    'Sweets',
    '#fff5d5',
  ),
];
export const diwaliCategories = [
  category(
    'diwali-decor',
    'Lights, Diya\n& Decor',
    imagePath.diwaliDecor,
    'Decor',
  ),
  category('home-makeover', 'Home\nMakeover', imagePath.homeMakeover, 'Home'),
  category(
    'sweets-hampers',
    'Sweets &\nHampers',
    imagePath.sweetsHampers,
    'Sweets',
  ),
  category(
    'diwali-gifts',
    'Diwali\nGift Shop',
    imagePath.diwaliGifts,
    'Gifting',
  ),
  category(
    'appliances',
    'Appliances\n& Gadgets',
    imagePath.appliances,
    'Electronics',
  ),
  category(
    'festive-ready',
    'Festive\nReady',
    imagePath.festiveReady,
    'Fashion',
  ),
];
export const readyCategories = [
  ...diwaliCategories.slice(0, 2),
  category(
    'home-upgrade',
    'Home\nUpgrade',
    imagePath.appliances,
    'Electronics',
  ),
  category('halloween', 'Halloween\nParty', imagePath.halloween, 'Party'),
  category('dry-fruits', 'Dry Fruits\n& Sweets', imagePath.dryFruits, 'Sweets'),
  category(
    'artisan',
    'Artisanal\nGift Boxes',
    imagePath.artisanGifts,
    'Gifting',
  ),
  category(
    'chocolates',
    'Chocolates\n& Hampers',
    imagePath.chocolateHampers,
    'Sweets',
  ),
  category(
    'signature',
    'Signature\nGifting',
    imagePath.signatureGifts,
    'Gifting',
  ),
];
export const groceryCategories = [
  category(
    'vegetables',
    'Vegetables\n& Fruits',
    imagePath.vegetables,
    'Vegetables',
  ),
  category('pantry', 'Atta, Rice\n& Dal', imagePath.attaRice, 'Pantry'),
  category('oil', 'Oil, Ghee\n& Masala', imagePath.oilMasala, 'Pantry'),
  category('dairy', 'Dairy, Bread\n& Eggs', imagePath.dairy, 'Dairy'),
  category('snacks', 'Snacks\n& Biscuits', imagePath.lays, 'Snacks'),
  category('sweets', 'Sweets &\nChocolates', imagePath.chocolate, 'Sweets'),
  category('drinks', 'Drinks\n& Juices', imagePath.coke, 'Drinks'),
  category(
    'kitchen',
    'Kitchenware\n& Appliances',
    imagePath.appliances,
    'Electronics',
  ),
];
export const beautyCategories = [
  category('bath', 'Bath & Body', imagePath.bathBody, 'Bath & Body'),
  category('hair', 'Hair', imagePath.hair, 'Hair'),
  category('skin', 'Skin & Face', imagePath.skinFace, 'Skin & Face'),
  category('cosmetics', 'Beauty &\nCosmetics', imagePath.cosmetics, 'Beauty'),
  category(
    'feminine',
    'Feminine\nHygiene',
    imagePath.feminineCare,
    'Feminine Hygiene',
  ),
  category('baby', 'Baby Care', imagePath.babyCare, 'Baby Care'),
  category('health', 'Health &\nPharma', imagePath.health, 'Health'),
  category('wellness', 'Sexual\nWellness', imagePath.wellness, 'Wellness'),
];
export const householdCategories = [
  category('home', 'Home &\nLifestyle', imagePath.homeLifestyle, 'Home'),
  category(
    'cleaners',
    'Cleaners &\nRepellents',
    imagePath.cleaners,
    'Cleaners',
  ),
  category('electronics', 'Electronics', imagePath.electronics, 'Electronics'),
  category('stationery', 'Stationery\n& Games', imagePath.stationery, 'Party'),
];
export const spotlightCategories = [
  category('monsoon', 'Monsoon\nStore', imagePath.monsoon, 'Travel', '#deedff'),
  category('travel', 'Travel\nStore', imagePath.travel, 'Travel', '#d9f1df'),
  category('hobby', 'Hobby\nStore', imagePath.hobby, 'Hobby', '#f3e5fb'),
  category('sports', 'Sports\nStore', imagePath.sports, 'Sports', '#e0f3e0'),
];
export const lifestyleCategories = [
  category(
    'spiritual',
    'Spiritual\nNeeds',
    imagePath.spiritual,
    'Pooja',
    '#fbf0d9',
  ),
  category('pet', 'Pet\nStore', imagePath.pet, 'Pet', '#edecd9'),
  category(
    'fashion',
    'Fashion\nBasics',
    imagePath.fashion,
    'Fashion',
    '#eeecfa',
  ),
  category('toys', 'Toy\nStore', imagePath.toys, 'Party', '#fde7df'),
  category('books', 'Book\nStore', imagePath.books, 'Books', '#f6f1e8'),
  category('pharma', 'Pharma\nStore', imagePath.pharma, 'Health', '#c5f0ff'),
  category(
    'gift-cards',
    'E-Gifts\nStore',
    imagePath.giftCards,
    'Gifting',
    '#fff5cc',
  ),
  category(
    'jewellery',
    'Jewellery\nStore',
    imagePath.jewellery,
    'Fashion',
    '#fce6ee',
  ),
];
export const categoryGroups = [
  {title: 'Grocery & Kitchen', items: groceryCategories},
  {title: 'Beauty & Personal Care', items: beautyCategories},
  {title: 'Household Essentials', items: householdCategories},
];
export const getProduct = (id: string) => products.find(item => item.id === id);
export function selectProducts(
  query = '',
  categoryName = '',
  savedIds?: string[],
) {
  const search = query.trim().toLowerCase();
  return products.filter(
    item =>
      (!categoryName ||
        categoryName === 'All' ||
        item.category === categoryName ||
        item.tags.includes(categoryName)) &&
      (!search ||
        `${item.name} ${item.category} ${item.tags.join(' ')}`
          .toLowerCase()
          .includes(search)) &&
      (!savedIds || savedIds.includes(item.id)),
  );
}
export const karwaProducts = products.filter(item =>
  ['karwa-set', 'mehendi', 'golden-karwa', 'jewellery'].includes(item.id),
);
export const diyaProducts = products.filter(item =>
  ['clay-diya', 'brass-diya', 'painted-diya'].includes(item.id),
);
export const ritualProducts = products.filter(item =>
  ['moti-chandan', 'moti-gulab', 'almond-oil'].includes(item.id),
);
export const bestsellerProducts = products.filter(item =>
  item.tags.includes('Bestsellers'),
);
