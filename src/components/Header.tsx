'use client';
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size='small' variant='outlined'>
          Subscribe
        </Button>
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          sx={{ flex: 1 }}
        >
          Blog
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button
          variant='outlined'
          size='small'
          onClick={() => router.push('/signin')}
        >
          Sign in
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}
