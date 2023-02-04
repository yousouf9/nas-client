import React, {useState,useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Container, CssBaseline, Grid, MenuItem, TextField } from '@mui/material';
import useLoader from '../../../hooks/useLoader';
import useNotification from '../../../hooks/useNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import useRequest from '../../../hooks/useRequest';
import userCategory from '../../../hooks/useCategory';
import useBooks from '../../../hooks/useBooks';
import useUser from '../../../hooks/useAuth';
import { Roles } from '../../../helpers/user-types';
import lodash from 'lodash'
import { canAccess } from '../../../helpers/access';
import FieldInput from '../../../components/Input/fileupload';
import usePage from '../../../hooks/usePage';


const theme = createTheme();

const EditPage = () =>{


  const user = useUser(state => state.user);
  const location = useLocation();
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const [pageDetail, setpageDetail] = useState(location.state);
  const editPage = usePage(state => state.addPage);



  const [doRequest] = useRequest({
    url:"/pages/sessions",
    method:"post",
    onSuccess:(data) => {
      setpageDetail({
        title:"",
        description:"",
        page: pageDetail.page
      }) 

      editPage(data)
      successNotification(`successfully added page section ${data.title}`, "section added")
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()

    const data = new FormData();


    data.append('title',  pageDetail.title);
    data.append('description', pageDetail.description);
    data.append('page', pageDetail.page);


   try {

    doRequest({}, {'Content-Type':  `multipart/form-data; ${data.getBoundary}`},data)

    

   } catch (error) {
    
    console.log("error from data", error);
   }

   HideLoader()
  };


  const handlePage = (e)=>{
    e.preventDefault();

    const name = e.target.name
    setpageDetail({
      ...pageDetail,
      [name]:e.target.value
    }) 

  }





  return(
    <>
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
                type="page name"
                value={pageDetail.page}
                onChange={handlePage}
                id="page"
                autoComplete="page"
                color='success'
                size='small'
              />
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
              Edit Page
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default EditPage;