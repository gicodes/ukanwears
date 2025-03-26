'use client'

import React from 'react';
import { Box } from '@mui/material';
import ShopTemplate from '../shop-template';
import { useProductContext } from '../../../contexts/product/product.context';

const Page: React.FC = () => {
  const { collections, subCategories } = useProductContext();
  const otherCollection = collections['Others'] || [];
  
  const otherSubCategories = subCategories.filter((sc) =>
    otherCollection.some((p) => p.subCategories.includes(sc))
  );

  return (
    <Box mt={1}>
      <ShopTemplate
        title="Random: Accessories, Bags and Clothing"
        description="Shop random clothing and other outfit"
        imageUrl="/images/shop-header.jpg"
        products={otherCollection}
        numberOfItems={otherCollection.length}
        filters={[
          {
            type: 'subCategory',
            label: 'Filter by sub⁃category',
            options: otherSubCategories,
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