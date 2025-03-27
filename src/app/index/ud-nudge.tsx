"use client";

import { Box, Typography } from "@mui/material";
import { useAuthSession } from "@/hooks/useAuthSession";

export default function userASDisplayNudge() {
  const { userAS } = useAuthSession() as { userAS: { name: string } | null };

  if (!userAS) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 69, 
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: 250,
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
            xs: 10,
            sm: 11,
            md: 11.5,
            lg: 12,
          },
        }}
      >
        Welcome, {userAS?.name}
      </Typography>
    </Box>
  );
}