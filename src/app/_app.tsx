"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from '../contexts/auth/auth.context';
import { AlertProvider } from '@/contexts/alerts/alert.context';
import { LoadingProvider } from '@/contexts/loading/loading.context';
import { ProductProvider } from "@/contexts/product/product.context";
import React, { useState, useMemo, useEffect, createContext } from "react";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function MyApp({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const preferredMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches ? "dark" : "light";
      setMode(preferredMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }), []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" 
            ? "var(--background-light)" : "var(--background-dark)",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <LoadingProvider>
            <AlertProvider>
              <ProductProvider>
                {children}
              </ProductProvider>
            </AlertProvider>
          </LoadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

