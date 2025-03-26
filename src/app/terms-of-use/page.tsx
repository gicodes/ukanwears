"use client"

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material';
import { TermsAndConsCard } from './modal';

const TermsAndConditions: React.FC = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
    setOpenCard(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: {xs: 9.9, md: 0}, py: 2}}>
        <Typography textAlign={'center'} variant="h6" component="h1" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography textAlign={'center'} variant='subtitle2' color='wheat'> — − ⁃ Ukan29 —</Typography>

        <Divider sx={{ my: 1, bgcolor: '#303030'}}/><br/>
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '12px' }}>
          1. Introduction
        </Typography>
        

        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            className="text-dark my-1"
            control={
              <Checkbox
                name="termsAccepted"
                checked={termsAccepted}
                onChange={handleCheckboxChange}
              />
            }
            label="I agree to the Terms & Conditions"
          />
        </Box>

        <TermsAndConsCard open={openCard} onClose={() => setOpenCard(false)} />
      </Box>
    </Container>
  );
};

export default TermsAndConditions;