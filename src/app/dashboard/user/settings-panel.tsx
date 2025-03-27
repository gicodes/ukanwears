import React, { useContext } from 'react';
import { ColorModeContext } from '../../_app';
import { Box, Switch, Typography } from '@mui/material';

const SettingsPanel: React.FC = () => {
  const { toggleColorMode } = useContext(ColorModeContext);
  
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography>Dark Mode</Typography>
        <Switch onChange={toggleColorMode} />
      </Box>
    </Box>
  );
};

export default SettingsPanel;