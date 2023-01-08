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


const theme = createTheme();

const EditBook = () =>{


  const user = useUser(state => state.user);
  const location = useLocation();
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const [bookDetail, setBookDetail] = useState(location.state)
  const editBook = useBooks(state => state.editBook);
  const  navigate = useNavigate();
  const categories = userCategory(state=> state.categories);
  const fetchALL  = userCategory(state => state.fetchALL);
  

  const [doRequest] = useRequest({
    url:undefined,
    method:'put',
    body:undefined,
    onSuccess:(data) => {
      editBook(data)
      successNotification("BooK successfully Edited", "Book Edited")
      navigate('/dashboard/books')
      console.log(data);
    }
  })

  const handleBook = (e)=>{
    e.preventDefault();

    const name = e.target.name
    setBookDetail({
      ...bookDetail,
      [name]:e.target.value
    }) 

  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    let newData = undefined;

    if(user.userType === Roles.lecturer){
     newData = lodash.omit(bookDetail, "bookStatus"); 
    }else{
      newData = bookDetail
    }
    try {
      showLoader()
       doRequest(newData, undefined, undefined, `/books/${bookDetail._id}/detail`)
     } catch (error) {

      const errors = error.response.data?.errors

      for(const err of errors){
        warningNotification(err.message)
     }

    }
    HideLoader()
  }

  useEffect(()=>{
    
     
    console.log(bookDetail.category, "categ");
    try {
      fetchALL();
    } catch (error) {
      console.log(error); 
    }

  },[])
  


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
                label="book title"
                value={bookDetail.title}
                onChange={handleBook}
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
                name="author"
                label="author name"
                type="author"
                value={bookDetail.author}
                onChange={handleBook}
                id="author"
                autoComplete="author"
                color='success'
                size='small'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="free"
                label="free book?"
                type="author"
                id="free"
                value={bookDetail.free}
                onChange={handleBook}
                autoComplete="author"
                color='success'
                select
                size='small'
              >
                <MenuItem value={"false"}>False</MenuItem>
                <MenuItem value={"true"}>True</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="type"
                label="Filet Types"
                type="select"
                id="type"
                autoComplete="type"
                value={bookDetail.type}
                onChange={handleBook}
                
                color='success'
                select
                size='small'
              >
                <MenuItem value='pdf'>PDF</MenuItem>
                <MenuItem value='video'>VIDEO</MenuItem>
              </TextField>
            </Grid>
          </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="book category"
              type="category"
              id="category"
              value={bookDetail.category}
              onChange={handleBook}
              autoComplete="category"
              color='success'
              select
              size='small'
            >
              {categories.map(item=>{
                return <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
              })}
              
            </TextField>
            {
              canAccess(
                [Roles.admin, Roles.bookmod],
                user.userType,
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bookStatus"
                  label="book approval status"
                  type="bookStatus"
                  id="bookStatus"
                  value={bookDetail.bookStatus}
                  onChange={handleBook}
                  autoComplete="bookStatus"
                  color='success'
                  select
                  size='small'
                >
                    <MenuItem value={"false"}>False</MenuItem>
                    <MenuItem value={"true"}>True</MenuItem>
                </TextField>
                
              )
            }


            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="book description"
              id="description"
              value={bookDetail.description}
              onChange={handleBook}
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
              Update Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default EditBook;