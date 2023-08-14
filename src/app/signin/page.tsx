'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import '../../utils/api/user';
import { setToken } from '@/utils/helper';
import { UserSVC } from '@/utils/services';

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface State {
  email: {
    value: string;
    error?: string | undefined;
  };
  password: {
    value: string;
    error?: string | undefined;
  };
  disableLogin: boolean;
}

export default function HomePage() {
  const router = useRouter();
  const [state, setState] = React.useState<State>({
    email: {
      value: '',
      error: undefined,
    },
    password: {
      value: '',
      error: undefined,
    },
    disableLogin: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChangeText =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop === 'email') {
        setState({
          ...state,
          email: {
            ...state.email,
            value: event.target.value.trim(),
            error: undefined,
          },
        });
      }
      if (prop === 'password') {
        setState({
          ...state,
          password: {
            ...state.password,
            value: event.target.value,
            error: undefined,
          },
        });
      }
    };

  const validateInputs = () => {
    let tempState = { ...state };
    let isValid = true;
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (state.password.value.length === 0) {
      tempState.password.error = 'Please enter the password';
      isValid = false;
    }
    if (!state.email.value.match(validRegex)) {
      tempState.email.error = 'Invalid email';
      isValid = false;
    }

    setState({ ...tempState });
    return isValid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      UserSVC.signIn(state.email.value, state.password.value).then((res) => {
        if (res.data.code === 200) {
          setToken(res.data.data.token);
          router.push(`/user/${res.data.data.id}`);
        } else if (res.data.code === 401) {
          alert('Password incorrect');
        } else if (res.data.code === 400) {
          alert('Invalid email');
        }
      });
    } else {
      return;
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            type='email'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={state.email.value}
            onChange={handleChangeText('email')}
            helperText={state.email.error}
            error={state.email.error === undefined ? false : true}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='current-password'
            value={state.password.value}
            onChange={handleChangeText('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={state.password.error === undefined ? false : true}
            helperText={state.password.error}
          />

          <Button
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={state.disableLogin}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
