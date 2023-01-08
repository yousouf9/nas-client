import React, {useState} from 'react';
import { DataGrid , GridToolbar } from '@mui/x-data-grid';
import useRequest from '../../hooks/useRequest';
import { useConfirm } from 'material-ui-confirm';
import useUser from '../../hooks/useAuth';
import useBooks from '../../hooks/useBooks';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
import moment from 'moment';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Roles } from '../../helpers/user-types';
import { canAccess } from '../../helpers/access';

export default function BookTable() {

  const confirm = useConfirm() 
  const user = useUser(state => state.user);
  const books = useBooks(state=> state.books);
  const totalCount = useBooks(state=> state.total);
  const fetchBooks  = useBooks(state => state.fetchBooks);
  const deleteBook = useBooks(state => state.deleteBook);
  const navigate = useNavigate()
  const [warningNotification, successNotification] = useNotification();

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);


  
  const [deleteRequest] = useRequest({
    url:undefined,
    method:'delete',
    body:undefined,
    onSuccess:(data) => {
      deleteBook(data)
      successNotification("Book Successfully deleted", "Book Deleted")
    }
  })

    
 const columns = [
  { field: '_id', headerName: 'ID', hide:true},
  { field: 'author', headerName: 'Author', width: 130 },
  { field: 'title', headerName: 'Title', width: 130 },
  {field: 'category', headerName: 'Category', width: 130},
  {field: 'type', headerName: 'Book Type', width: 130},
  {field: 'free', type:"boolean", headerName: 'Free Status', width: 90},
  {field: 'bookStatus', type:"boolean", headerName: 'Book Status', width: 90},
  {
    field: 'fullName',
    headerName: 'Created By',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 170,
    valueGetter: (params) =>
      `${params.row?.addedBy?.firstName || ''} ${params.row?.addedBy?.lastName || ''}`,
  },
  { field: 'createdAt',
  type:"date",  
  headerName: 'Date Created', 
  width: 200,
  valueFormatter: params => 
  moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 140,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
        const handleDelete = (e) => {
          const currentRow = params.row;
          confirm({
            description:"Are you sure you want to delete this book!",
            confirmationText:"Yes"
          })
          .then(() => {
            try {

              if(user.userType === Roles.lecturer){
                deleteRequest({}, undefined, undefined, `/books/${currentRow._id}?myown=${user.id}`)
              }else{
                deleteRequest({}, undefined, undefined, `/books/${currentRow._id}`)
              }
             } catch (error) {
               console.log(error);
             }
          })
          .catch(() => {

          })
        };

        const handleView = (e) => {
          const currentRow = params.row;
          
          if(currentRow.type === "video"){
            navigate("/book/video", {state:{...currentRow}})
          }else{
            navigate("/book/pdf", {state:{...currentRow}})
          }
          return
        };
        const handleEdit = (e) => {
          const currentRow = params.row;
          navigate('/dashboard/books/edit', {state:currentRow})
          return
        };
        
        return (
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Action</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={""}
            label="Action"
            variant='outlined'
            color='info'
            onChange={(e)=> console.log(e)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>
              <Button fullWidth variant="outlined" color="info" size="small" onClick={handleView}>View</Button>
            </MenuItem>
            <MenuItem value={20}>
            <Button fullWidth variant="outlined" color="warning" size="small" onClick={handleEdit}>Edit</Button>
            </MenuItem>
            {
            canAccess(
              [Roles.admin, Roles.lecturer],
                user.userType,
              <MenuItem value={30}>
                <Button fullWidth variant="outlined" color="error" size="small" onClick={handleDelete}>Delete</Button>
              </MenuItem>
            )
            }
          </Select>
        </FormControl>
        );
    },
  }
];

    const  callback = useCallback( async()=>{
      if(user.userType === Roles.lecturer){
        fetchBooks({limit:pageSize, page, myown:user.id})
      }else{
        fetchBooks({limit:pageSize, page})
      }
    }, [fetchBooks, pageSize, page])

    useEffect(()=>{
    try {
      setIsLoading(true)
      callback()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
    }, [callback])

 // const [rowCountState, setRowCountState] = React.useState(0);
 // useEffect(() => {
  //setRowCountState((prevRowCountState) =>
 //  totalCount !== undefined ? totalCount : prevRowCountState,
 // );
 //   }, [totalCount, setRowCountState]);

 //   console.log("Total", rowCountState, books);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        autoHeight
        rows={books}
        rowCount={totalCount}
        loading={isLoading}
        columns={columns}
        page={page}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        pagination
        experimentalFeatures={{aggregation: true}}
        getRowId={(row) => row._id}
        components={{
          Toolbar:GridToolbar
        }}
      />
    </div>
  );
}