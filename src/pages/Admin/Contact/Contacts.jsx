import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid, } from '@mui/material';

  import { Add } from '@mui/icons-material';
  import ContactTable from '../../../components/Table/ContactTable';

  const Contact = () =>{

    return(
      <>
        <Box sx={{ flexGrow: 0 }}>
          <ContactTable />
        </Box>

      </>
    )
}

export default  Contact