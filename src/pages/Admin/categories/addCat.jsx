import  React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import useLoader from '../../../hooks/useLoader';
import useNotification from '../../../hooks/useNotification';
import userCategory from '../../../hooks/useCategory';
import AlertDialogSlide from '../../../components/Dialog/dialog';
import useRequest from '../../../hooks/useRequest';

export default function EditCategory({open, setOpen}) {

  const addCategory = userCategory(state => state.addCategory);
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const [title, setTitle] = useState("");

  const [createCategoryRequest] = useRequest({
    url:'/categories',
    method:'post',
    body:undefined,
    onSuccess:(data) => {
      addCategory(data)
      console.log(data);
      successNotification(data?.message, "category added")
    }
  })


  const handleTitle = (e) =>{
    e.preventDefault();
    setTitle(e.target.value)
  }

  const handleClose = async (e) => {
        
    if(e.target.type === 'button') {
     try {
      showLoader()
      await createCategoryRequest({title})
     } catch (error) {

      const errors = error.response.data?.errors

      for(const err of errors){
        warningNotification(err.message)
     }
    }
    }
    HideLoader()
    setTitle('')
    setOpen(false);
  };


  return (
    <>
      {Loader}
      <AlertDialogSlide
            open={open}
            handleClose={handleClose}
            title="Add New Category"
            description="use the new category use the new category use the new category"
            button_text="Add Category"
            >

             <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Category Name"
              value={title}
              onChange={handleTitle}
              color='success'
            />
        </AlertDialogSlide>
    </>
  );
}
