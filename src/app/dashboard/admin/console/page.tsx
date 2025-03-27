'use client'

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { AuthContext } from '@/contexts/auth/auth.context'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Grid,
  Paper,
  Link,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Inventory,
  Image,
  People,
  BarChart,
  Logout,
  ArrowBackIosNew,
} from '@mui/icons-material';
import ProductsManagement from './product-management';
import ImageManagement from './image-management';
import UserManagement from './user-management';
import Statistics from './statistics';

const drawerWidth = 240;

const ModeratorDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('products');
  const { user, logout} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const sections = [
    { name: 'products', icon: <Inventory />, component: <ProductsManagement /> },
    { name: 'images', icon: <Image />, component: <ImageManagement /> },
    { name: 'users', icon: <People />, component: <UserManagement /> },
    { name: 'statistics', icon: <BarChart />, component: <Statistics /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        color="default" 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          height: 66, display: 'grid', 
          alignSelf: 'center' 
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
              Moderator Panel
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            <Button sx={{ gap: 2, my: 2}} href='/'>
              <ArrowBackIosNew />
              <Typography>Back to home</Typography>
            </Button>

            {sections.map((section) => (
              <ListItem
                key={section.name}
                onClick={() => {
                  setSelectedSection(section.name);
                  setOpen(false);
                }}
              >
                <ListItemIcon>{section.icon}</ListItemIcon>
                <ListItemText primary={section.name.charAt(0).toUpperCase() + section.name.slice(1)} />
              </ListItem>
            ))}
            <ListItem onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <Button sx={{ gap: 2, my: 2}} href='/'>
              <ArrowBackIosNew />
              <Typography>Back to home</Typography>
            </Button>

            {sections.map((section) => (
              <ListItem
                key={section.name}
                onClick={() => setSelectedSection(section.name)}
              >
                <ListItemIcon>{section.icon}</ListItemIcon>
                <ListItemText primary={section.name.charAt(0).toUpperCase() + section.name.slice(1)} />
              </ListItem>
            ))}
            <ListItem onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
              {sections.find((s) => s.name === selectedSection)?.component}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ModeratorDashboard;
