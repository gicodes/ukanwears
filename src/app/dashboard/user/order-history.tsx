import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const OrderHistory: React.FC = () => {
  const orders = ['Order #1 - 10/01/2023', 'Order #2 - 10/15/2023'];
  return (
    <>
      <Typography variant="h6">Order History</Typography>
      <List>
        {orders.map((order, index) => (
          <ListItem key={index}>
            <ListItemText primary={order} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OrderHistory;