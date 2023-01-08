import React, {useEffect, useCallback} from 'react';
import {
  Box,
  Button,
  Divider,
  Grid, 
  Stack, 
  TextField} from '@mui/material';

  import { Add, Edit, Delete } from '@mui/icons-material';

import DataTable from '../../../components/Table/TableData';
import userCategory from '../../../hooks/useCategory';
import { useConfirm } from 'material-ui-confirm';
import { canAccess } from '../../../helpers/access';
import { Roles } from '../../../helpers/user-types';
import useUser from '../../../hooks/useAuth';
import useRequest from '../../../hooks/useRequest';
import AddCategory from './addCat';


  const BookCategory = () =>{

  const confirm = useConfirm() 
  const user = useUser(state => state.user);
  const categories = userCategory(state=> state.categories);
  const fetchALL  = userCategory(state => state.fetchALL);
  const editCategory = userCategory(state => state.editCategory);
  const deleteCategory = userCategory(state => state.deleteCategory);

  const [doRequest] = useRequest({
    url:undefined,
    method:'put',
    body:undefined,
    onSuccess:(data) => {
      editCategory(data)
      console.log(data);
    }
  })
  const [deleteRequest] = useRequest({
    url:undefined,
    method:'delete',
    body:undefined,
    onSuccess:(data) => {
      deleteCategory(data)
      console.log(data);
    }
  })

  const categoryRef = React.useRef('');

  //dialog control
  const [open, setOpen] = React.useState(false);


  const columns = [
   { field: 'id', headerName: 'ID', hide:true},
   { field: 'title', headerName: 'Category Name', width: 200 },
   {
     field: 'action',
     headerName: 'Action',
     width: 210,
     sortable: false,
     disableClickEventBubbling: true,
     renderCell: (params) => {
         const handleDelete = (e) => {
           const currentRow = params.row;
           confirm({
             description:`You are about to delete ${currentRow.title}`,
             confirmationText:"Yes",
           })
           .then(() => {

            try {
             deleteRequest({}, undefined, undefined, `/categories/${currentRow.id}`)
            } catch (error) {
              console.log(error);
            }
           })
           .catch(() => {
 
           })
         };
         const handleEdit = (e) => {
           const currentRow = params.row;
   
           console.log("values",currentRow?.title , categoryRef.current);
           confirm({
             title:"Edit",
             description:"This account is permanent!",
             confirmationText:"Update",
             content:(
             <TextField
               margin="normal"
               required
               fullWidth
               name="category"
               label="Category Name"
               inputRef={categoryRef}
               defaultValue={currentRow?.title}
               color='success'
             />
             )
           })
           .then(() => {
             console.log(categoryRef.current.value);

             const data = {
              title: categoryRef.current.value
             }

             try {
              doRequest(data, undefined, undefined, `/categories/${currentRow.id}`)
             } catch (error) {
               console.log(error);
             }
             
           })
           .catch(() => {
            console.log("errror");
           })
         };
         
         return (
            <Stack direction="row" spacing={2}>
              <Button startIcon={<Edit/>} fullWidth variant="outlined" color="info" size="small" onClick={handleEdit}>Edit</Button>
              {
                canAccess(
                  [Roles.admin],
                  user.userType,
                  <Button startIcon={<Delete/>} fullWidth variant="outlined" color="error" size="small" onClick={handleDelete}>Delete</Button>
                )
              }
              
            </Stack>
         );
     },
   }
 ];
    
      const  callback = useCallback( async()=>{
        fetchALL()
      }, [fetchALL])

      useEffect(()=>{
      try {
        callback()
      } catch (error) {
        console.log(error);
      }
      }, [callback])

      const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
      };

    
    return(
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Grid marginBottom={3} container justifyContent="flex-end">
            <Button 
                variant='contained' 
                color="info"
                onClick={handleClickOpen}
                startIcon={<Add/>}
                >
                  ADD category
            </Button>
            <Divider />
          </Grid>
          <DataTable row={categories} columns={columns} />
        </Box>
        <AddCategory
         open={open}
         setOpen={setOpen}
        />
      </>
    )
}

export default  BookCategory