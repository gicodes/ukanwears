import React from 'react';
import { Box, Card, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import { allCategories1, allCategories2 } from '../utils/allCategories';

interface FCProductCardProps {
  bgImage: string;
  title: string;
  link: string;
}

const FCProductCard = ({ bgImage, title, link }: FCProductCardProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:hover .overlay': {
          opacity: 1,
        },
      }}
    >
      <Card
        sx={{
          minWidth: { xs: 160, sm: 200, md: 250 },
          height: { xs: 200, md: 250 },
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
        }}
      />
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <Box 
          sx={{ 
            p: 1,
            my: 1,
            px: 2,
            opacity: 1,
            color: '#909090',
            borderRadius: 0.25,
            bgcolor: 'rgba(0, 0, 0, 0.5)' 
          }}
        >
          <Typography variant='caption'>{title}</Typography>
        </Box>

        <Button component={Link} href={link} 
          variant='contained' 
          color='warning'
          sx={{ p: 0.5}}
        >
          <Box p={0.5} border={'0.1px solid #909090'}>
            <Typography p={0.5} border={'0.1px solid #909090'} fontSize={11} textTransform={'none'}>
              Tap to shop
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

const FeaturedContainer = ({ id }: { id: number }) => {
  const categories = id === 1 ? allCategories1 : allCategories2;

  return (
    <Box sx={{ p: 2, mx: 'auto', width: '100%', maxWidth: 800 }}>
      <Grid container spacing={2}>
        {categories.slice(0, 4).map((category: any) => (
          <Grid item xs={6} key={category.title}>
            <FCProductCard
              bgImage={category.bgImage}
              title={category.title}
              link={category.link}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedContainer;