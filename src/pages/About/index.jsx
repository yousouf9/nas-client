import  React, {useCallback, useEffect, useState} from 'react';
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
import usePage from '../../hooks/usePage';
import { Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios'


const theme = createTheme();

const  HomeContact =() =>{

  const pages = usePage(state => state.pages);
  const fetchPages = usePage(state => state.fetchPages);

  const [Loader, showLoader, HideLoader]  = useLoader()


  const  callback = useCallback( async()=>{
    fetchPages("About")
  }, [fetchPages])


    useEffect(()=>{

      async function getData(){
        const result = await axios.get('https://staging.valuepayng.com/v1/pages?page=1&limit=3page_category=company&for', {withCredentials: false})

        console.log(result)
      }
      
    try {

      getData()

      showLoader()
      callback()
      HideLoader()

      
    } catch (error) {
      console.log(error);
    }
    }, [callback])

  return (
    <>
      <HomeHeader/>
      <ThemeProvider theme={theme}>
      {Loader}

        <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems:'flex-start',
          }}
        >
          {
            pages.length ? 
             pages.map(page =>  <ListPageSection key={page.id} url={page.url} position={page.position} title={page.title} description={page.description}/>)
            :<p>About page has no content</p>
          }
          
            
        </Box>
      </Container>   
   
    </ThemeProvider>
    </>

  );
}


const ListPageSection = ({title, description, url, position}) =>{
  return (
    <Card sx={{ display: 'flex', width: '100%', margin:'8px 0'}}>

     {position === "left"
       ? url &&
        url.startsWith('http') ? 
            <CardMedia
            component="img"
            sx={{ width: '400px', objectFit:"fill"}}
            image={url}
            alt={title}
          />
         : null
       :null
     }
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5" marginBottom={2}>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {description}
        </Typography>
      </CardContent>
    </Box>
    {position === "right"
       ? url &&
        url.startsWith('http') ? 
            <CardMedia
            component="img"
            sx={{ width: '400px', objectFit:"fill"}}
            image={url}
            alt={title}
          />
         : null
       :null
     }
  </Card>
  )
}

export default HomeContact