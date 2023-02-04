import  React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useAuth';
import useLoader from '../../../hooks/useLoader';
import useNotification from '../../../hooks/useNotification';
import { Grid, MenuItem } from '@mui/material';
import FieldInput from '../../../components/Input/fileupload';
import userCategory from '../../../hooks/useCategory';
import useRequest from '../../../hooks/useRequest';

const theme = createTheme();

const initial = {
  title:"",
  description:"",
  page:"",
  position:""
}

export default function AddPage() {

  const user = useUser(state => state.user);
 
  const [photo, setPhoto] = useState(undefined);
  const [pageDetail, setPageDetail] = useState(initial);


  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();


  const  [doRequest] = useRequest({
    url:"/pages/",
    method:"post",
    onSuccess:(data) => {
      setPhoto(undefined)
      setPageDetail(initial) 
      successNotification(`successfully added page ${data.title}`, "book added")
    }
  })
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()

    const data = new FormData();

    if(photo){
      data.append("photo", photo[0]);
    }
    data.append('title',  pageDetail.title);
    data.append('description', pageDetail.description);
    data.append('page', pageDetail.page);
    data.append("position", pageDetail.position);


   try {

    doRequest({}, {'Content-Type':  `multipart/form-data; ${data.getBoundary}`},data)

    

   } catch (error) {
    
    console.log("error from data", error);
   }
  



   HideLoader()
  };


  const handleFileUploadError = (error) => {
    // Do something...
    console.log(error);
  }
  
  const handleFilesChange = (files) => {
    // Do something...
    if(files[0]?.type.startsWith('image')){
      setPhoto(files)
    }

  }

  const handlePage = (e) =>{
    setPageDetail({
      ...pageDetail,
      [e.target.name]: e.target.value
    })
  }


  return (
    <ThemeProvider theme={theme}>
      {Loader}
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="page title"
                value={pageDetail.title}
                onChange={handlePage}
                name="title"
                autoComplete="title"
                autoFocus
                color='success'
                size='small'
                
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="page"
                label="Page Name"
                type="page"
                value={pageDetail.page}
                onChange={handlePage}
                id="page"
                autoComplete="page"
                color='success'
                size='small'
                placeholder='one word page name'
              />
            </Grid>
            <Grid item xs={12}>
              <FieldInput
              handleFileUploadError={handleFileUploadError}
              handleFilesChange={handleFilesChange}
              allowedExtensions={["image/*"]}
              title="Sectional Images Image"
              value={photo}
              
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                name="position"
                label="Image Position"
                type="position"
                id="position"
                value={pageDetail.position}
                onChange={handlePage}
                autoComplete="position"
                color='success'
                select
                size='small'
              >
                <MenuItem value={"right"}>right</MenuItem>
                <MenuItem value={"left"}>left</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        


            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="page description"
              id="description"
              value={pageDetail.description}
              onChange={handlePage}
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
              Add Page
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
