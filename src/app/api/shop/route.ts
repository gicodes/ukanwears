import { Product } from '../../../types/product';

const mockProduct: Product[] = [
  {
    id: '1',
    name: 'Kids Sneakers',
    price: 20000,
    stock: 5,
    sizes: ['S', 'M'],
    description: 'kids between 6-9',
    imageUrls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    collection: 'Kids',
    subCategories: ['Sportswear', 'Footwear'],
    createdAt: new Date('2023-10-01T00:00:00Z'),
    updatedAt: new Date(),
    purchased: 50,
    saved: 20,
  },
  {
    id: '2',
    name: 'Women’s Jacket',
    price: 20000,
    stock: 5,
    sizes: ['XL', '2XL'],
    imageUrls: ['https://example.com/image3.jpg', 'https://example.com/image4.jpg'],
    description: 'Cozy jacket for winter',
    collection: 'Women',
    subCategories: ['Clothing'],
    createdAt: new Date('2023-10-05T00:00:00Z'),
    updatedAt: new Date(),
    purchased: 100,
    saved: 30,
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProduct);
    }, 1000);
  });
};