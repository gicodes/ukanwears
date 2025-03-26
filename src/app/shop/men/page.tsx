'use client'

import React from 'react';
import { Box } from '@mui/material';
import ShopTemplate from '../shop-template';
import { useProductContext } from '../../../contexts/product/product.context';

const Page: React.FC = () => {
  const { collections, subCategories } = useProductContext();
  const menProducts = collections['Men'] || [];
  
  const menSubCategories = subCategories.filter((sc) =>
    menProducts.some((p) => p.subCategories.includes(sc))
  );

  return (
    <Box mt={1}>
      <ShopTemplate
        title="Men"
        description="Shop Men's wears, shoes and other fits"
        imageUrl="/images/shop-header.jpg"
        products={menProducts}
        numberOfItems={menProducts.length}
        filters={[
          {
            type: 'subCategory',
            label: 'Filter by sub⁃category',
            options: menSubCategories,
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