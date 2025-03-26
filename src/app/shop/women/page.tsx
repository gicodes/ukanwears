'use client'

import React from 'react';
import { Box } from '@mui/material';
import ShopTemplate from '../shop-template';
import { useProductContext } from '../../../contexts/product/product.context';

const Page: React.FC = () => {
  const { collections, subCategories } = useProductContext();
  const WomenClothing = collections['Women'] || [];
  
  const womenSubCategories = subCategories.filter((sc) =>
    WomenClothing.some((p) => p.subCategories.includes(sc))
  );

  return (
    <Box mt={1}>
      <ShopTemplate
        title="Women"
        description="Shop for women's clothing, bags and shoes"
        imageUrl="/images/shop-header.jpg"
        products={WomenClothing}
        numberOfItems={WomenClothing.length}
        filters={[
          {
            type: 'subCategory',
            label: 'Filter by sub⁃category',
            options: womenSubCategories,
          },
          { type: 'date', label: 'Sort by Date' },
          { type: 'price', label: 'Price Range' },
          { type: 'stock', label: 'Stock Availability' },
          { type: 'size', label: 'Sizes' },
        ]}
      />
    </Box>
    
  );
};

export default Page;