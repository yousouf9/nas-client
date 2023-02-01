import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useUser from '../../hooks/useAuth';
import useLoader from '../../hooks/useLoader';
import useNotification from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../../components/Dialog/dialog';
import useRequest from '../../hooks/useRequest';
import request from '../../api/build-request';
import HomeHeader from '../../components/headers/Home';
import { Paper } from '@mui/material';
import {Phone, MyLocation, Email} from '@mui/icons-material';



const theme = createTheme();

const  HomeContact =() =>{

  const setUserData = useUser(state => state.setUserData);

  //dialog control
  const [open, setOpen] = React.useState(false);

  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const [doRequest] = useRequest({
    url:'/users/signin',
    method: 'post',
    onSuccess: (data) => {

      successNotification("Logged in successfully", "Logged In")
      setUserData(data)

      if(!data.isVerified){
        navigate('/verify')
        return
      }
      if(data.userType === "user") {
        navigate('/')  
        }else{
        navigate('/dashboard')
      }
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      remember: data.get('remember'),
    });

    
    await doRequest({ email:data.get('email'), password:data.get('password')})
  
    HideLoader()

  };

  
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = async (e) => {
    
    if(e.target.type === 'button') {
     try {
       const response = await request().post('/users/reset_password', {
           email
       })
       setUserData(response.data?.data)
       successNotification(response.data?.data?.message, "Email Sent")
       navigate('/verify_token')
       return;

     } catch (error) {

      console.log(error);
        const errors = error.response.data?.errors
    
      for(const err of errors){
        warningNotification(err.message)
     }
    }
    }
    setOpen(false);
  };


  const handleEmailChange = (e) => {
    e.preventDefault()
    const value = e.target.value;
    setEmail(value)
  }



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
              <Typography variant="h6">phone</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box p={1} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
              <MyLocation color='#b7e6b7'  fontSize='medium'/>
              <Typography variant="h6">Address</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box p={1} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
              <Email color='#b7e6b7'  fontSize='medium'/>
              <Typography variant="h6">Email</Typography>
            </Box>
          </Paper>
        </Box>
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
              autoComplete
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