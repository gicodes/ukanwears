import { createContext, useState, useCallback, useMemo, ReactNode } from "react";
import { CircularProgress, Backdrop } from "@mui/material";

interface LoadingContextType {
  startLoading: () => void;
  stopLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  startLoading: () => {},
  stopLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const isLoading = useMemo(() => loadingCount > 0, [loadingCount]);

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {children}
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};