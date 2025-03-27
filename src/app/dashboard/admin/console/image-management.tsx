import React from 'react';
import { Typography, Button, ImageList, ImageListItem } from '@mui/material';

const ImageManagement: React.FC = () => {
  const images = ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'];
  return (
    <>
      <Typography variant="h6">Image Management</Typography>
      <Button variant="contained" sx={{ mb: 2 }}>Upload Image</Button>
      <ImageList cols={3} rowHeight={164}>
        {images.map((url, index) => (
          <ImageListItem key={index}>
            <img src={url} alt={`Product ${index}`} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default ImageManagement;