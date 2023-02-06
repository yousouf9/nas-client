import React, {useState,useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Container, CssBaseline, Grid, MenuItem, TextField } from '@mui/material';
import useLoader from '../../../hooks/useLoader';
import useNotification from '../../../hooks/useNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import useRequest from '../../../hooks/useRequest';
import useUser from '../../../hooks/useAuth';
import useContact from '../../../hooks/useContact';


const theme = createTheme();

const SendMessage = () =>{


  const user = useUser(state => state.user);
  const location = useLocation();
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const [contactDetail, setcontactDetail] = useState({
     ...location.state,
     description:''
  });
  const editContact = useContact(state => state.editContact);
  const  navigate = useNavigate();


  const [doRequest] = useRequest({
    url:undefined,
    method:"post",
    onSuccess:(data) => {
      editContact(data)
      successNotification('Your message has been sent', "Message Sent!")
      navigate('/dashboard/contacts')
      console.log(data);
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()

    const data = {
      'title':contactDetail.title,
      'description': contactDetail.description,
      'id':contactDetail.id
    }


   try {

    showLoader()
    doRequest(data, undefined, undefined, `/contacts/send`)
    

   } catch (error) {
    
    console.log("error from data", error);
   }

   HideLoader()
  };


  const handleContact = (e)=>{
    e.preventDefault();

    const name = e.target.name
    setcontactDetail({
      ...contactDetail,
      [name]:e.target.value
    }) 

  }





  return(
    <>
      {Loader}
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth='md'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width:'100%' }}>
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="message title"
                value={contactDetail.title}
                onChange={handleContact}
                name="title"
                autoComplete="title"
                autoFocus
                color='success'
                size='small'
                
              />
            </Grid>
          </Grid>

            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="message"
              id="description"
              value={contactDetail.description}
              onChange={handleContact}
              multiline
              rows={4}
              autoComplete="description"
              color='success'
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              send
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default SendMessage;