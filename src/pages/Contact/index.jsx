import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useUser from '../../hooks/useAuth';
import useLoader from '../../hooks/useLoader';
import useNotification from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import request from '../../api/build-request';
import HomeHeader from '../../components/headers/Home';
import { Link, Paper } from '@mui/material';
import {Phone, MyLocation, Email} from '@mui/icons-material';



const theme = createTheme();

const  HomeContact =() =>{

  const setUserData = useUser(state => state.setUserData);

  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();


  const [doRequest] = useRequest({
    url:'/contacts',
    method: 'post',
    onSuccess: (data) => {
      successNotification("message sent!", "Sent")
      setUserData(data)
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()
    const data = new FormData(event.currentTarget);
    console.log({
      sender:data.get('email'),
      title:data.get('title'),
      description:data.get('description'),
      name:data.get('name'),
      phone:data.get('phone'),
    });

    const newdata = {
      sender:data.get('email'),
      title:data.get('title'),
      description:data.get('description'),
      name:data.get('name'),
      phone:data.get('phone'),
    }
    
    await doRequest(newdata)
  
    HideLoader()

  };

  


  return (
    <>
      <HomeHeader/>
      <ThemeProvider theme={theme}>
      {Loader}
      <Box>
        <Box
          sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}
        >
          <Typography variant='h4' color={'red'} > Get in Touch</Typography>
          <Typography>For complaint or inquiries contact us</Typography>
        </Box>
        <Box maxWidth="xs"
          sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-evenly',
          alignItems: 'center',
          }}
        >
          <Paper>
            <Box p={1} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
              <Phone color='green'  fontSize='medium'/>
              <Typography variant="p">
                <Link href='tel:07030502570'>07030502570</Link>
              </Typography>
              <Typography variant="p">
                <Link href='tel:08111706680'>08111706680</Link>
              </Typography>

              <Email color='#b7e6b7'  fontSize='medium'/>
              <Typography variant="p">
                <Link href='mailto:info@nlibrary.org.ng'>info@nlibrary.org.ng</Link>
              </Typography>
              <Typography variant="p">
                <Link href='mailto:globalunifieddevelopmentempire@gmail.com'>globalunifieddevelopmentempire@gmail.com</Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.3500751111146!2d7.904677512174454!3d8.8469623769316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1051e5f91e1e66c3%3A0xee066b44177c4537!2sNasarawa%20State%20University%20Keffi!5e0!3m2!1sen!2sng!4v1675689676747!5m2!1sen!2sng" width={"100%"} height={"450"} style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </Box>

        <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
          > 
          <Grid item xs={6}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Subject"
              type="text"
              id="title"
              color='success'
              size='small'
            />
          <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="text"
              id="name"
              autoComplete="current-password"
              color='success'
              size='small'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color='success'
              size='small'
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              autoFocus
              color='success'
              size='small'
            />
          </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                fullWidth
                name="description"
                label="message"
                id="description"
                multiline
                rows={8}
                autoComplete="description"
                color='success'
              />
            </Grid>
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Container>   
   


    </ThemeProvider>
    </>

  );
}

export default HomeContact