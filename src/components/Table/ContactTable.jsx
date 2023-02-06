import React, {useState} from 'react';
import { DataGrid , GridToolbar, gridClasses } from '@mui/x-data-grid';
import useRequest from '../../hooks/useRequest';
import { useConfirm } from 'material-ui-confirm';
import useUser from '../../hooks/useAuth';
import usePage from '../../hooks/usePage';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
import moment from 'moment';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Roles } from '../../helpers/user-types';
import { canAccess } from '../../helpers/access';
import useContact from '../../hooks/useContact';



const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));


export default function ContactTable(){

  const confirm = useConfirm() 
  const user = useUser(state => state.user);
  const contacts = useContact(state=> state.contacts);
  const fetchContacts  = useContact(state => state.fetchContacts);
  const deleteContact = useContact(state => state.deleteContact);
  const navigate = useNavigate()
  const [warningNotification, successNotification] = useNotification();

  
  const [deleteRequest] = useRequest({
    url:undefined,
    method:'delete',
    body:undefined,
    onSuccess:(data) => {
      deleteContact(data)
      successNotification("Contact Successfully deleted", "Page Deleted")
    }
  })

    
 const columns = [
  { field: 'id', headerName: 'ID', hide:true},
  { field: 'name', headerName: 'Name', width: 130 },
  {field: 'title', headerName: 'Title', width: 130},
  {field: 'sender', headerName: 'email', width: 230},
  {field: 'read', type:"boolean", headerName: 'Opened', width: 90},
  {field: 'replied', type:"boolean", headerName: 'Replied', width: 90},
  { 
  field: 'createdAt',
  type:"date",  
  headerName: 'Date Sent', 
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
            description:"Are you sure you want to delete this message",
            confirmationText:"Yes"
          })
          .then(() => {
            console.log(currentRow);
            try {
              deleteRequest({}, undefined, undefined, `/contacts/${currentRow.id}`)
             } catch (error) {
               console.log(error);
             }
          })
          .catch(() => {

          })
        };

        const handleView = (e) => {
          const currentRow = params.row;
            navigate("/dashboard/contacts/view", {state:{...currentRow}})

          return
        };
        const handleEdit = (e) => {
          const currentRow = params.row;
          navigate('/dashboard/contacts/reply', {state:currentRow})
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
            <Button fullWidth variant="outlined" color="warning" size="small" onClick={handleEdit}>Reply</Button>
            </MenuItem>
            {
            canAccess(
              [Roles.admin],
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
      
      fetchContacts()
   
    }, [fetchContacts])

    useEffect(()=>{
    try {
      callback()
      console.log(contacts, "One two");
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
      <StripedDataGrid
        autoHeight
        rows={contacts}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        pagination
        experimentalFeatures={{aggregation: true}}
        components={{
          Toolbar:GridToolbar
        }}
        getRowClassName={(params) => {
            console.log(params);
            return  params.row.read ? 'even' : 'odd'
        }
        }
      />
    </div>
  );
}