'use client'

import React from 'react';
import { Box } from '@mui/material';
import ShopTemplate from './shop-template';
import { useProductContext } from '../../contexts/product/product.context';

const ShopPage: React.FC = () => {
  const { products, subCategories } = useProductContext();

  return (
    <Box mt={1}>
      <ShopTemplate
        title="All Products"
        description="Browse through our entire collections and categories"
        imageUrl="/images/shop-header.jpg"
        products={products}
        numberOfItems={products.length}
        filters={[
          {
            type: 'subCategory',
            label: 'Filter by sub⁃category',
            options: subCategories,
          },
        ]}
      />
    </Box>
    
  );
};

export default ShopPage;