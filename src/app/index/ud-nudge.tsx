"use client";

import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../contexts/auth/auth.context";

export default function UserDisplayNudge() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64, 
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: 300,
        width: "90%",
        bgcolor: "rgba(0, 0, 0, 0.7)", 
        color: "white",
        padding: "8px 16px",
        borderRadius: "16px",
        zIndex: 1200, 
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "8.8px",
            sm: "9.5px",
            md: "10px",
            lg: "11px",
          },
        }}
      >
        Welcome, {user.name}
      </Typography>
    </Box>
  );
}