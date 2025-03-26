import { Product } from '../../types/product';
import { fetchProducts } from '../../app/api/shop/route';
import React, { createContext, useState, useEffect, useMemo } from 'react';

interface ProductContextValue {
  products: Product[];
  collections: { [key: string]: Product[] };
  subCategories: string[];
  loading: boolean;
  error: Error | null;
  getNewArrivals: (limit?: number) => Product[];
  getTrendingItems: (limit?: number) => Product[];
}

export const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const collections = useMemo(() => {
    return products.reduce((acc: { [key: string]: Product[] }, product) => {
      const { collection } = product;
      if (!acc[collection]) {
        acc[collection] = [];
      }
      acc[collection].push(product);
      return acc;
    }, {});
  }, [products]);

  const subCategories = useMemo(() => {
    const allSubCats = products.flatMap((product) => product.subCategories);
    return [...new Set(allSubCats)]; 
  }, [products]);

  const getNewArrivals = (limit = 10): Product[] => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  const getTrendingItems = (limit = 10): Product[] => {
    return [...products]
      .sort((a, b) => (b.purchased + b.saved) - (a.purchased + a.saved))
      .slice(0, limit);
  };

  const value: ProductContextValue = {
    products,
    collections,
    subCategories,
    loading,
    error,
    getNewArrivals,
    getTrendingItems,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = (): ProductContextValue => {
  const context = React.useContext(ProductContext);
  
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};