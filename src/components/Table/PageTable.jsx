import React, {useState} from 'react';
import { DataGrid , GridToolbar } from '@mui/x-data-grid';
import useRequest from '../../hooks/useRequest';
import { useConfirm } from 'material-ui-confirm';
import useUser from '../../hooks/useAuth';
import usePage from '../../hooks/usePage';
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
  const pages = usePage(state=> state.pages);
  const fetchPages  = usePage(state => state.fetchPages);
  const deletePage = usePage(state => state.deletePage);
  const navigate = useNavigate()
  const [warningNotification, successNotification] = useNotification();

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)


  
  const [deleteRequest] = useRequest({
    url:undefined,
    method:'delete',
    body:undefined,
    onSuccess:(data) => {
      deletePage(data)
      successNotification("Page Successfully deleted", "Page Deleted")
    }
  })

    
 const columns = [
  { field: 'id', headerName: 'ID', hide:true},
  { field: 'title', headerName: 'Title', width: 130 },
  {field: 'page', headerName: 'Page', width: 130},
  {field: 'isSection', type:"boolean", headerName: 'Section', width: 90},
  { 
  field: 'createdAt',
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
            description:"Are you sure you want to delete this Page/Section!",
            confirmationText:"Yes"
          })
          .then(() => {

            console.log(currentRow);
            try {
              deleteRequest({}, undefined, undefined, `/pages/${currentRow.id}`)
             } catch (error) {
               console.log(error);
             }
          })
          .catch(() => {

          })
        };

        const handleView = (e) => {
          const currentRow = params.row;
            navigate("/dashboard/pages/section/add", {state:{...currentRow}})

          return
        };
        const handleEdit = (e) => {
          const currentRow = params.row;
          navigate('/dashboard/pages/edit', {state:currentRow})
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
              <Button fullWidth variant="outlined" color="info" size="small" onClick={handleView}>add Section</Button>
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
      
        fetchPages()
   
    }, [fetchPages])

    useEffect(()=>{
    try {
      callback()
      console.log(pages, "One two");
    } catch (error) {
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
        rows={pages}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        pagination
        experimentalFeatures={{aggregation: true}}
        components={{
          Toolbar:GridToolbar
        }}
      />
    </div>
  );
}