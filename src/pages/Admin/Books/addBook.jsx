import  React, {useState,useEffect, useCallback} from 'react';
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
  author:"",
  category:"",
  free:'false',
  type:'pdf',
}

export default function AddBook() {

  const user = useUser(state => state.user);
 
  const [photo, setPhoto] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [bookDetail, setBookDetail] = useState(initial);

  const categories = userCategory(state=> state.categories);
  const fetchALL  = userCategory(state => state.fetchALL);


  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();

  useEffect(()=>{
     
     
    try {
      fetchALL();
    } catch (error) {
      console.log(error); 
    }

  },[])


  const  [doRequest] = useRequest({
    url:"/books/",
    method:"post",
    onSuccess:(data) => {
      setContent(undefined) 
      setPhoto(undefined)
      setBookDetail(initial) 
      successNotification(`successfully added book ${data.title}`, "book added")
    }
  })
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()

    const data = new FormData();

    data.append("photo", photo[0]);
    data.append("content", content[0]);
    data.append('title',  bookDetail.title);
    data.append('description', bookDetail.description);
    data.append('author', bookDetail.author);
    data.append('category', bookDetail.category);
    data.append('free', bookDetail.free)
    data.append('type', bookDetail.type);
    data.append('addedBy', user?.id)
    


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
    console.log(files);
    if(files[0]?.type.startsWith('image')){
      setPhoto(files)
    }else{
      setContent(files)
    }

    console.log(files);
  }

  const handleBook = (e) =>{
    setBookDetail({
      ...bookDetail,
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
            <Grid item xs={6}>
              <FieldInput
              handleFileUploadError={handleFileUploadError}
              handleFilesChange={handleFilesChange}
              allowedExtensions={["image/*"]}
              title="Cover Image"
              value={photo}
              
              />
            </Grid>
            <Grid item xs={6}>
              <FieldInput
              handleFileUploadError={handleFileUploadError}
              handleFilesChange={handleFilesChange}
              allowedExtensions={['video/*', '.pdf']}
              title="Upload the PDF or Video"
              value={content}
              />
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
              Add Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
