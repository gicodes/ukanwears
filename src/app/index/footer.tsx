'use client'

import React, { useState } from 'react';
import { Box, Badge, Link, Typography } from '@mui/material';

const countries = [
  { name: '🇺🇸 United States', href: '/us' },
  { name: '🇳🇬 Nigeria', href: '/ng' },
  { name: '🇲🇽 Mexico', href: '/mx' },
];

const policyLinks = [
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookie Policy', href: '/cookie' },
];

export default function Footer() {
  const [countriesOption, setCountriesOption] = useState(false);

  return (
    <Box sx={{ p: 2, mt: 5, backgroundColor: 'background.paper' }}>
      <Box mx={{ sm: 10, md: 20}}>
        <Typography variant="subtitle2" color='gray'>
          <Badge 
            sx={{ cursor: 'pointer'}} 
            onClick={() => setCountriesOption(!countriesOption)}
          > 🌍 countries {countriesOption ? '▴' : '▾'}
          </Badge>
        </Typography>
        { countriesOption && 
          <Box>
            <Box
              sx={{
                my: 1,
                display: 'grid',
                gap: 0.5,
              }}
            >
              {countries.map((country) => (
                <Link
                  key={country.name}
                  href={country.href}
                  underline="hover"
                >
                  <Typography variant="subtitle2" color='gray'>
                    {country.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        }
      </Box>

      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            my: 5,
            gap: 2,
            justifyContent: { sm: 'center' },
          }}
        >
          {policyLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              {index > 0 && (
                <Typography
                  color='whitesmoke'
                  variant="subtitle2"
                  sx={{ display: { xs: 'none', sm: 'inline' } }}
                >
                  |
                </Typography>
              )}
              <Link href={link.href} underline="hover">
                <Typography variant="subtitle2" color='whitesmoke'>
                  {link.name}
                </Typography>
              </Link>
            </React.Fragment>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography
          variant="caption"
          color='#909090'
          sx={{ textAlign: 'center', display: 'block' }}
        >
          © 2025 Ukan Wears. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}