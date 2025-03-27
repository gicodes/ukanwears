import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const SavedItems: React.FC = () => {
  const items = ['Product A', 'Product B', 'Product C'];
  return (
    <>
      <Typography variant="h6">Saved Items</Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography>{item}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SavedItems;