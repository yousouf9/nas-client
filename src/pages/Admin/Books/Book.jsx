import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid, } from '@mui/material';

  import { Add } from '@mui/icons-material';
  import BookTable from '../../../components/Table/BookTable';

  const BookAdmin = () =>{

    return(
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Grid marginBottom={3} container justifyContent="flex-end">
            <Button 
              variant='contained' 
              color="info"
              href="/dashboard/books/add"
              startIcon={<Add/>}
              >
                ADD BOOK
          </Button>
            <Divider />
          </Grid>
          <BookTable />
        </Box>

      </>
    )
}

export default  BookAdmin