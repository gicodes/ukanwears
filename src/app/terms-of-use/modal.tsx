import { useTheme } from "@emotion/react";
import CloseIcon from '@mui/icons-material/Close';
import { TermsAndConsCardContent } from "./t&c-content";
import { Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material";

interface TermsAndConsProps {
  open: boolean;
  onClose: () => void;
}

export const TermsAndConsCard = ({ open, onClose }: TermsAndConsProps) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12.5px',
          fontWeight: 'bold'
        }}
      >
        Terms & Conditions
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          fontSize: '10px',
        }}
      >
        <TermsAndConsCardContent />
      </DialogContent>
    </Dialog>
  );
};
