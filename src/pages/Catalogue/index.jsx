import React, {useState, useEffect, useCallback} from "react";
import Pagination from "@mui/material/Pagination";
import CardWrapper from "../../components/Book/CardWrapper";
import { Autocomplete, Box, Container, CssBaseline, Divider, Grid, IconButton, InputAdornment, InputBase, Paper, TextField } from "@mui/material";
import useLoader from "../../hooks/useLoader";
import request from "../../api/build-request";
import HomeHeader from "../../components/headers/Home";
import SearchIcon from '@mui/icons-material/Search';
import userCategory from "../../hooks/useCategory";
import {debounce} from 'lodash'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

const  CatalogueHome = () => {

  const categories = userCategory(state=> state.categories);
  const fetchALL  = userCategory(state => state.fetchALL);
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [inputValue, setInputValue] = useState('');
  const [bookStatus, setBookStatus] = useState("");
  const [search, setSearch] = useState("");

 

  const  callback = useCallback( 
    async()=>{
    showLoader()
    try {

      const res = await request().get(`/books?limit=${pageSize}&page=${page}&free=${bookStatus}&category=${inputValue}&search=${search}`);

      console.log(res, "data gotten");

      setBooks(res.data.data.docs)
      setTotalCount(res.data.data.totalPages)

      } catch (error) {
         console.log(error.response?.data)
      }
      finally{
        HideLoader()
      }

  }, 
  [pageSize, page, inputValue, bookStatus, search])

  useEffect(()=>{
  try {
    
    callback()
    
  } catch (error) {

    console.log(error);
  }
  }, [callback])


  const handleChange = (event, value) => {
    setPage(value)
  };

  useEffect(()=>{
    fetchALL()
  },[])

  const handleSubmit = (event)=>{
    event.preventDefault()
    console.log(search);
  }

  return(
    <>
     <HomeHeader />
      <ThemeProvider theme={theme}>
        {Loader}
        <Paper elevation={3} sx={{padding: "10px", margin: "10px 0"}}> 
        <Box sx={{ flexGrow: 1 }}>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={2} sm={4} md={6}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <InputBase
                        fullWidth
                        sx={{ flex: 1}}
                        placeholder="Search for Author, book title or description"
                        inputProps={{ 'aria-label': 'Search for Author, book title or description' }}
                        value={search}
                        onChange={
                          (event) => {
                            setSearch(event.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton type="button" onClick={handleSubmit} sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                          </IconButton>
                          </InputAdornment>
                        }
            
                    />
                </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
              <Autocomplete
                  disablePortal
                  id="combo-box-cat"
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}

                  options={
                    categories.length > 0 ? categories.map(item =>{
                      return {label: item.title, id:item.id}
                    }) : []
                  }
                  sx={{ width: 300 }}
                  size="small"
                  renderInput={(params) => <TextField size="small" {...params} label="categories" />}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <Autocomplete
                  disablePortal
                  id="combo-box-cat"
                  inputValue={bookStatus}
                  onInputChange={(event, newInputValue) => {
                    setBookStatus(newInputValue);
                  }}
                  options={["false", "true"]}
                  sx={{ width: 300 }}
                  size="small"
                  renderInput={(params) => <TextField size="small" {...params} label="book status" />}
                />
              </Grid>
          </Grid>
        </Box>
      </Paper>
        <Container component="main" maxWidth='xl' >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              marginLeft: 0,
              marginRight:0,
              padding:0
            }}
          >
            <CardWrapper data={books} />
            <Divider />
            <div style={{ display: "flex", justifyContent: "center", marginTop:"5px" }}>
              <Pagination
                count={totalCount}
                page={page}
                onChange={handleChange}
                color="success"
              />
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}




export default CatalogueHome