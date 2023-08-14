'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
        }}
      >
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component='h1'
                variant='h3'
                color='inherit'
                gutterBottom
              >
                Welcome
              </Typography>
              <Typography variant='h5' color='inherit' paragraph>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
