'use client'

import Link from "next/link";
import React, { useContext, useState } from "react";
import { useAuthSession } from "@/hooks/useAuthSession";
import { AuthContext } from "@/contexts/auth/auth.context";
import { authBarItems, menuItems } from "./utils/menu-items";
import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, Box, Divider, TextField, InputAdornment, Stack } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, ShoppingCart, Close as CloseIcon, AccountCircle, Face } from "@mui/icons-material";

export default function Header() {
  const { userAS, loading } = useAuthSession();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAuth = () => setAuthOpen(!authOpen);

  const handleLogout = () => {
    logout();
    setAuthOpen(false);
  };

  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: 0, height: 66, display: 'grid' }}>
      <Toolbar sx={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center", width: "100%" }}>
          <Box>
            <IconButton onClick={toggleMenu}> <MenuIcon /> </IconButton>
            <IconButton> <SearchIcon /> </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
              <Link href={'/'}>Ukan29</Link>
            </Typography>
          </Box>

          <Box>
            <IconButton> <ShoppingCart /> </IconButton>
            <IconButton onClick={toggleAuth}> <AccountCircle /> </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Typography variant="h6">
            <Link href={'/'}>Ukan29</Link>
          </Typography>

          <Box>
            {menuItems.map((item) => (
              <Button key={item.name} href={item.link} sx={{ mx: { xs: 1, sm : 0.2}, color: 'burlywood' }}>
                {item.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search..."
              sx={{ mr: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton> <ShoppingCart /> </IconButton>
            <IconButton onClick={toggleAuth}> <AccountCircle /> </IconButton>
          </Box>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box sx={{ width: "100vw", height: "100vh", p: 2 }}>
          <IconButton onClick={toggleMenu} sx={{ position: "absolute", top: 16, right: 16 }}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" my={1}>              
            <Link href={'/'}>Ukan29</Link>
          </Typography>

          <Divider />
          <Box mt={12}>
            {menuItems.map((item) => (
              <Button fullWidth key={item.name} href={item.link} sx={{ textAlign: "left", my: 1, color: 'burlywood' }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={authOpen} onClose={toggleAuth}>
        <Box sx={{ width: 250, height: "100vh", p: 2 }}>
          <IconButton onClick={toggleAuth} sx={{ position: "absolute", top: 16, right: 16 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" fontSize={'small'} sx={{ my: 2 }}>
            <Face />
          </Typography>
          <Divider />
          <Box my={5} p={2.5} textAlign={'center'}>
            <Typography variant="subtitle2" mb={5}>
              {userAS ? (
                <Stack>
                  <Button onClick={handleLogout}>Logout</Button>
                  <Button href="/dashboard" onClick={() => setAuthOpen(false)}>Profile</Button>
                </Stack>
              ) : (
                <Link href="/auth/login" onClick={() => setAuthOpen(false)}>Login</Link>
              )}
            </Typography>
            <Typography variant="caption" color="#909090"> 
              ⸻ Actions as Guest ⸻ 
            </Typography>
            <Box mt={4}>
              {authBarItems.map((item) => (
                <Typography fontSize={12} key={item.name} my={1} color="burlywood">
                  <Link href={item.href} onClick={() => setAuthOpen(false)}>{item.name}</Link>
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
