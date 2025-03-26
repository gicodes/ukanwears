'use client'

import React from 'react';
import { Box } from '@mui/material';
import ShopTemplate from '../shop-template';
import { useProductContext } from '../../../contexts/product/product.context';

const Page: React.FC = () => {
  const { collections, subCategories } = useProductContext();
  const kidsProducts = collections['Kids'] || [];
  
  const kidsSubcategories = subCategories.filter((sc) =>
    kidsProducts.some((p) => p.subCategories.includes(sc))
  );

  return (
    <Box mt={1}>
      <ShopTemplate
        title="Kids"
        description="Shop clothing and other outfit for kids between 1 and 9 years. You can associate or estimate ages with sizes from XS to 3XL"
        imageUrl="/images/shop-header.jpg"
        products={kidsProducts}
        numberOfItems={kidsProducts.length}
        filters={[
          {
            type: 'subCategory',
            label: 'Filter by sub⁃category',
            options: kidsSubcategories,
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