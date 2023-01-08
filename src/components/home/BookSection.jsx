import * as React from 'react';
import {Grid, Typography, Divider} from '@mui/material'

export const BookSection = ({title,children}) => {
  return (
    <Grid  className='container' sx={{mt:5, p:4}}>
      <Typography variant="h4" component="h4"
        color={'green'}
        >
        {title}
      </Typography>
      <Divider color='success' />
      {children}
    </Grid>
  );
};