'use client';

import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const images = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

export const IndexImageCard2 = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box textAlign="center">
      <Card
        sx={{
          mx: 'auto',
          width: '100%',
          minWidth: 300,
          position: 'relative',
          maxWidth: { sm: 750, lg: 1000 },
          height: { xs: 468, sm: 357, md: 345 },
          backgroundImage: `url(${images[index]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          boxShadow: 3,
          transition: 'background-image 0.5s ease-in-out'
        }}
      >
        <Box sx={{ position: 'absolute', top: '50%', left: 1, transform: 'translateY(-50%)'}}>
          <Button onClick={handlePrev} sx={{ bgcolor: 'transparent'}}>
            <ChevronLeft className="round-circle" sx={{ boxShadow: 2, color: 'black'}} />
          </Button>
        </Box>
        <Box sx={{ position: 'absolute',  top: '50%', right: 1, transform: 'translateY(-50%)' }}>
          <Button onClick={handleNext} sx={{ bgcolor: 'transparent'}}>
            <ChevronRight className="round-circle" sx={{ boxShadow: 2, color: 'black'}} />
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

interface AnimatedCardProps {
  image: string;
}

const AnimatedCard = styled(Box)<AnimatedCardProps>`
  width: 100%;
  min-width: 300px;
  height: 500px;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-size 0.5s ease-in-out;
  animation: zoomInOut 3s ease-in-out infinite alternate;

  @keyframes zoomInOut {
    from {
      background-size: 100%;
    }
    to {
      background-size: 111%;
    }
  }

  &:hover {
    animation-play-state: paused;
    background-size: 115%;
  }
`;

export const IndexImageCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <AnimatedCard image={images[currentIndex]} />
    </Box>
  );
};

export default IndexImageCard;