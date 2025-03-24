"use client";

import Link from "next/link";
import React, { useState } from "react";
import { authBarItems, menuItems } from "./utils/menu-items";
import { AppBar, Toolbar, IconButton, Button, Typography, Drawer, Box, Divider, TextField, InputAdornment } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, ShoppingCart, Close as CloseIcon, AccountCircle, Face } from "@mui/icons-material";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAuth = () => setAuthOpen(!authOpen);

  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: 0, borderBottom: "0.1px solid #101010" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
        <Box minHeight={69} sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center", width: "100%" }}>
          <IconButton onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
              <Link href={'/'}>Ukan29</Link>
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <ShoppingCart />
            </IconButton>
            <IconButton onClick={toggleAuth}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Typography variant="h6">Ukan29</Typography>
          <Box>
            {menuItems.map((item) => (
              <Button key={item.name} sx={{ textTransform: "none", mx: { xs: 1, sm : 0.2}, color: 'burlywood' }}>
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
            <IconButton>
              <ShoppingCart />
            </IconButton>
            <IconButton onClick={toggleAuth}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box sx={{ width: "100vw", height: "100vh", p: 2 }}>
          <IconButton onClick={toggleMenu} sx={{ position: "absolute", top: 16, right: 16 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ my: 2 }} fontSize={'small'}> Menu </Typography>
          <Divider />
          <Box my={5}>
            {menuItems.map((item) => (
              <Button key={item.name} fullWidth sx={{ textAlign: "left", my: 1, color:  'burlywood' }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={authOpen} onClose={toggleAuth}>
        <Box sx={{ width: 250, height: "100vh", p: 2 }}>
          <IconButton 
            onClick={toggleAuth} 
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" fontSize={'small'} sx={{ my: 2 }}>
            <Face />
          </Typography>
          <Divider />
          <Box my={5} p={2.5} textAlign={'center'}>
            { authBarItems.map((item) => (
              <Typography key={item.name} my={2} color="burlywood">
                <Link href={item.href}>{item.name}</Link>
              </Typography>
            ))}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}