import { createContext, useState, useCallback, useMemo, ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";

type AlertSeverity = "error" | "info" | "success" | "warning";

interface AlertType {
  id: number;
  message: string;
  severity: AlertSeverity;
  autoClose: number;
  clickableClose: boolean;
}

interface AlertContextType {
  addAlert: (
    message: string,
    severity?: AlertSeverity,
    autoClose?: number,
    clickableClose?: boolean
  ) => void;
}

export const AlertContext = createContext<AlertContextType>({
  addAlert: () => {},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = useCallback(
    (
      message: string,
      severity: AlertSeverity = "info",
      autoClose = 5,
      clickableClose = true
    ) => {
      const id = Date.now();
      setAlerts((prev) => [
        ...prev,
        { id, message, severity, autoClose, clickableClose },
      ]);
    },
    []
  );

  const removeAlert = useCallback((id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const renderedAlerts = useMemo(
    () =>
      alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open
          autoHideDuration={alert.autoClose ? alert.autoClose * 1000 : null}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            removeAlert(alert.id);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={alert.severity}
            onClose={alert.clickableClose ? () => removeAlert(alert.id) : undefined}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )),
    [alerts, removeAlert]
  );

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {renderedAlerts}
    </AlertContext.Provider>
  );
};