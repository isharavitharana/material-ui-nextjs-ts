'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { UserSVC } from '@/utils/services';
import { useParams } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../../../utils/api/user';

export default function UserPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = React.useState<{
    id: number;
    name: string;
    email: string;
    password: string;
  }>({} as any);
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (typeof params.id === 'string') {
      UserSVC.getUser(params.id).then((res) => {
        if (res.data.code === 200) {
          setUser(res.data.data);
          setOpen(false);
        } else if (res.data.code === 401) {
          router.push('/signin');
        }
      });
    }
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          height: '100vh',
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://demos.creative-tim.com/now-ui-kit-react/static/media/bg5.d60a95eb.jpg)`,
        }}
      >
        <Avatar
          alt='Remy Sharp'
          src='https://demos.creative-tim.com/now-ui-kit-react/static/media/ryan.ca24473b.jpg'
          sx={{ width: 150, height: 150 }}
        />
        <Typography component='h1' variant='h3' color='#fff' gutterBottom>
          {user.name}
        </Typography>
        <Typography variant='h5' color='#fff'>
          {user.email}
        </Typography>
      </Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => {}}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
}
