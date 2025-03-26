'use client'

import { Product } from '../../types/product'; 
import React, { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard, { ProductModal } from './product-card';

interface FilterConfig {
  type: 'subCategory' | 'date' | 'price' | 'stock' | 'size';
  label: string;
  options?: string[]; 
}

interface ShopTemplateProps {
  title: string;
  description: string;
  imageUrl: string;
  products: Product[];
  filters: FilterConfig[];
  numberOfItems?: number;
}

const ShopTemplate: React.FC<ShopTemplateProps> = ({
  title,
  description,
  imageUrl,
  products,
  filters,
  numberOfItems,
}) => {
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const subCategoryFilter = filters.find((f) => f.type === 'subCategory');
  const hasProducts = products.length > 0;

  const filteredProducts = useMemo(() => {
    if (selectedSubCategories.length === 0) {
      return products;
    }
    return products.filter((product) =>
      product.subCategories.some((sc) => selectedSubCategories.includes(sc))
    );
  }, [products, selectedSubCategories]);

  const handleSubCategoryChange = (subCategory: string, checked: boolean) => {
    setSelectedSubCategories((prev) =>
      checked ? [...prev, subCategory] : prev.filter((sc) => sc !== subCategory)
    );
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Box
        sx={{
          px: 2.5,
          // backgroundImage: `url(${imageUrl})`,
          backgroundImage: 'url(/photo-1543163521-1bf539c55dd2.avif)',
          backgroundSize: 'cover',
          height: '300px',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box p={2} bgcolor={'rgba(0,0,0,0.4)'} boxShadow={5}>
          <Typography variant='h6' color='goldenrod' my={1}>
            {title} Collections
          </Typography>
          <Typography variant='subtitle2'>{description}</Typography>
          {numberOfItems !== undefined && 
          <Typography color='silver' mt={1} fontSize={10}>{numberOfItems} item(s) ready</Typography>}
        </Box>
      </Box>

      <section style={{ padding: '20px' }}>
        {hasProducts && subCategoryFilter && (
          <Box>
            <Typography variant='h6' my={1} color='#909090'>{subCategoryFilter.label}</Typography>

            <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
              {subCategoryFilter.options?.map((option) => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <input
                    type="checkbox"
                    checked={selectedSubCategories.includes(option)}
                    onChange={(e) => handleSubCategoryChange(option, e.target.checked)}
                  />
                  <Typography variant='caption'>{option}</Typography>
                </label>
              ))}
            </Box>
          </Box>
        )}
      </section>

      <section id={''} style={{ padding: '20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredProducts.map((product) => (
            <section
              id={product.name}
              key={product.id}
            >
              <ProductCard
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            </section>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </Box>
  );
};

export default ShopTemplate;