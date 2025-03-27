'use client'

import Header from './header';
import { Toolbar } from '@mui/material';
import { usePathname } from 'next/navigation';
import UserDisplayNudge from './index/ud-nudge';

export default function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname === '/dashboard/admin/console') {
    return null;
  }
  return (
    <>
      <Header />
      <Toolbar />
      <UserDisplayNudge />
    </>
  );
}