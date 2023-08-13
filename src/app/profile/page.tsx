'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function ProfilePage() {
  const [user, setUser] = React.useState<{
    id: number;
    email: string;
    password: string;
  }>({} as any);

  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#cfe8fc',
          height: '100vh',
        }}
      >
        <Typography>Id: {user.id}</Typography>
        <Typography>Email: {user.email}</Typography>
      </Box>
    </Container>
  );
}
