import React, { useState , useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography, } from '@mui/material';

  import { Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoader from '../../../hooks/useLoader';
import useContact from '../../../hooks/useContact';
import { useCallback } from 'react';

  const ViewMessage = () =>{

    const location = useLocation();
    const [Loader, showLoader, HideLoader]  = useLoader()
    const [pageDetail, setpageDetail] = useState(location.state);
    const contact = useContact(state => state.contact);
    const fetchContact = useContact(state => state.fetchContact);
    const navigate = useNavigate();
    const  callback = useCallback( async()=>{
      fetchContact(pageDetail.id)
 
  }, [fetchContact])

    useEffect(()=>{
    try {
      showLoader()
      callback()
      HideLoader()
    } catch (error) {
    }
    }, [callback, showLoader, HideLoader])
    return(
      <>
        {!contact 
        ?  Loader
        :
        <Box sx={{ flexGrow: 0 }}>
          <Grid marginBottom={3} container justifyContent="flex-end">
            <Button 
              variant='contained' 
              color="info"
              onClick={()=> navigate('/dashboard/contacts/reply', {state: contact})}
              startIcon={<Add/>}
              >
                Reply Message
          </Button>
          </Grid>
          <Box sx={{ padding: 5}}>
              <Typography variant='h4' color='grey'>
                  {contact.title}
              </Typography>
              <Divider />
              <Typography sx={{paddingTop:'15px'}}>
                  {contact.description}
              </Typography>
          </Box>
        </Box>
        }


      </>
    )
}

export default  ViewMessage