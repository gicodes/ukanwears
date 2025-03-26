export interface Product {
  id: string;
  name: string;
  collection: 'Kids' | 'Women' | 'Men' | 'Others';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL')[];
  subCategories: string[]; 
  imageUrls: string[];
  description: string;
  price: number;
  stock: number;
  purchased: number; 
  saved: number; 
  createdAt: Date | string;
  updatedAt: Date | string;
}