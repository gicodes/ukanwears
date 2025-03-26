import React from 'react'
import Link from 'next/link';
import LoginForm from './login-form';
import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
    <Box mt={8.8} textAlign={'center'}>
      <LoginForm />
      <br/>
      <Typography variant='subtitle2'>
        Don't have an account? 
        <Link href={'/auth/register'} className='text-link'> Sign Up!</Link>
      </Typography>
    </Box>
  )
}

export default Page
