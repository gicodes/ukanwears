'use client'

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  ShoppingCart,
  Favorite,
  Settings,
  Logout,
  ArrowBackIosNew,
} from '@mui/icons-material';
import SavedItems from '../user/saved-items';
import ProfileForm from '../user/profile-form';
import OrderHistory from '../user/order-history';
import SettingsPanel from '../user/settings-panel';
import { AuthContext } from '@/contexts/auth/auth.context';

const drawerWidth = 240;

const UserDashboard: React.FC = () => {
  const { user, logout} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('profile');
  const router = useRouter();

  const handleDrawerToggle = () => setOpen(!open);

  const handleLogout = () => {
    logout()
    router.push('/');
  }

  const sections = [
    { name: 'profile', icon: <AccountCircle />, component: <ProfileForm /> },
    { name: 'orders', icon: <ShoppingCart />, component: <OrderHistory /> },
    { name: 'saved', icon: <Favorite />, component: <SavedItems /> },
    { name: 'settings', icon: <Settings />, component: <SettingsPanel /> },
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
              Ukan29
            </Typography>
          </Box>

          <Box>
            <IconButton> <ShoppingCart /> </IconButton>
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

export const getLayout = (page: React.ReactNode) => page;

export default UserDashboard;