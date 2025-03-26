import React from 'react'
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import RegistrationForm from './registration-form';

const Page = () => {
  return (
    <Box mt={8.8} textAlign={'center'}>
      <RegistrationForm />
      <br/>
      <Typography variant='subtitle2'>
        Already have an account? 
        <Link href={'/auth/login'} className='text-link'> Sign in!</Link>
      </Typography>
    </Box>
  )
}

export default Page
