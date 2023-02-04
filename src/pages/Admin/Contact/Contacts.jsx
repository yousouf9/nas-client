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
          <Grid marginBottom={3} container justifyContent="flex-end">
            <Button 
              variant='contained' 
              color="info"
              href="/dashboard/pages/add"
              startIcon={<Add/>}
              >
                Add Page
          </Button>
            <Divider />
          </Grid>
          <ContactTable />
        </Box>

      </>
    )
}

export default  Contact