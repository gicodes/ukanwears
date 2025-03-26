import React from 'react';
import Image from 'next/image';
import { Product } from '../../types/product';
import { Box, Button, Card, Typography } from '@mui/material';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        mx: 0,
        cursor: 'pointer',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <Box 
        sx={{
          width: '100%',
          height: '200px',
          loading: 'lazy',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'url(/photo-1543163521-1bf539c55dd2.avif)'
          // backgroundImage: `url(${product.imageUrls[0]})`,
        }}
      />
      <Box my={1}>
        <Typography variant='subtitle1' fontWeight={'bold'}>{product.name}</Typography>
        <Typography color='#909090' letterSpacing={1} mb={1}>${product.price}</Typography>
        <Typography variant='caption' color={product.price < 5 ? 'wheat' : 'forestgreen'}> {product.stock} pieces left </Typography>
      </Box>
    </Card>
  );
};

export default ProductCard;

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        p={2}
        sx={{
          bgcolor: '#1a1a1a',
          width: '90%',
          maxWidth: '800px',
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        <Button
          onClick={onClose}
          color='warning'
          sx={{ 
            top: '10px', 
            right: '10px',
            position: 'absolute', 
          }}
        >
          Close
        </Button>

        <Box my={1}>
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
        
        <Typography variant='subtitle2' fontFamily={'bold'}>{product.name}</Typography>
        <Typography variant='caption' color='#909090'>{product.description}</Typography>

        <Box mt={2} mb={1} display={'flex'} justifyContent={'space-between'}>
          <Typography fontSize={12} letterSpacing={0.75}>
            <span className='text-wheat'>Stock</span>: {product.stock} Left</Typography>
          <Typography fontSize={12} letterSpacing={0.75}>
            <span className='text-wheat'>Price</span>: ${product.price}</Typography>
        </Box>
        <Typography variant='caption' letterSpacing={0.75}>
          <span className='text-wheat'>Sizes</span>: {product.sizes?.join(', ') || 'N/A'}</Typography>

        <Box p={1} mt={2} textAlign={'center'} bgcolor={'rgba(0, 0, 0, 0.5)'}>
          <Typography color='wheat'>Swipe to pay</Typography>
        </Box>
      </Box>
    </Box>
  );
};