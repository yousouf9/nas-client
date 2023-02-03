import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid, } from '@mui/material';

  import { Add } from '@mui/icons-material';
  import PageTable from '../../../components/Table/PageTable';

  const Page = () =>{

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
          <PageTable />
        </Box>

      </>
    )
}

export default  Page