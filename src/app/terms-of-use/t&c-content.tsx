import { Box, Typography } from "@mui/material";

export const TermsAndConsCardContent: React.FC = () => {
  return (
    <Box>
      <Typography my={1} textAlign={'center'} gutterBottom variant="subtitle1">
        <strong>General Terms and Conditions</strong>
      </Typography>
      <Typography mb={3} gutterBottom  variant="subtitle2">
        These Terms And Conditions Should Guide You On Our Intents for the platform
        <span>By accessing or using our services, you agree to be bound by these terms. And 
          if you do not agree with any or all of our Terms of Use, you should kindly discontinue this process. </span>
      </Typography>

      <Typography mb={2} variant="body1" fontWeight={'bold'}>Users</Typography>
      
    </Box>
  );
};
