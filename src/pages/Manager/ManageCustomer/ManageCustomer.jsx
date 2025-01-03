import React, { useEffect, useState, useCallback } from 'react';
import ManagerSideBar from '../../../layouts/components/ManagerSideBar';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { avatars } from '../ManageStaff/avatar';
import CustomerModalForm from './CustomerForm';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import WarningIcon from '@mui/icons-material/Warning';

import { cdmApi } from '../../../misc/cdmApi';
import axios from 'axios';

//Main Page
const ManageCustomerPage = () => {

  const [rows, setRows] = useState([]);
  const [formState, setFormState] = useState(null);
  const [dataChangeFlag, setDataChangeFlag] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [sortModel, setSortModel] = useState([{ field: 'index', sort: 'asc' }]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await cdmApi.getAllUsers(
        page,
        pageSize,
        sortModel[0].field,
        sortModel[0].sort.toUpperCase()
      );
      const filtedRoleData = response.data.content.filter(
        (row) => row.role === 'CUSTOMER'
      );
      filtedRoleData.forEach((row, index) => {
        if (!row.avatar) row.avatar = avatars[index % avatars.length];
      });
      const addedIndexData = filtedRoleData.map((row, index) => ({
        ...row,
        index: page * pageSize + index + 1,
      }));
      setRows(addedIndexData);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortModel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  


  //Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  
  //Popup
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupMessage, setPopupMessage] = React.useState(null);
  
  //
  const [rowToEdit, setRowToEdit] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);

  //Ask before save

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleEntered = () => {
    // noButtonRef.current?.focus();
  };

  const handleSubmit = (newFormState)  => {
    delete newFormState.index;
    setFormState(newFormState);
    if(rowToEdit === null) 
      setPopupMessage(`Do you really want to create a new customer?`);
    else
      setPopupMessage(`Do you really want to update customer's information?`);
    setPopupOpen(true);
  };

  const handleNo = () => {
    setDeletingId(null);
    setPopupOpen(false);
  };

  const handleYes = async () => {
    console.log("Yes");
    if (deletingId !== null)
      handleDeleteApi();   
    else 
    {

      const formData = new FormData();
      formData.append("file", formState.avatar);
      formData.append("upload_preset", "xuanlinh");

      const resUpload = await axios.post("https://api.cloudinary.com/v1_1/dqfhfd7ts/image/upload", formData);
      
      setFormState({...formState, avatar: resUpload.data.secure_url});
      const subFormState = {...formState, avatar: resUpload.data.secure_url};
      
      if (rowToEdit === null)  
        handleCreateApi(subFormState);
      else 
        handleUpdateApi(subFormState);
        
      
    }
    setPopupOpen(false);
    setModalOpen(false);
  };

  const handleCreateApi = async (subFormState) => {
    try {
      subFormState.role = "CUSTOMER";
      subFormState.password = "Newuser123";
      const response = await cdmApi.createCustomer(subFormState);
      //setRows([...rows, response.data]);
      setDataChangeFlag(!dataChangeFlag);
      setSnackbar({ children: "Updated successfully", severity: "success" });
    } catch (error) {
      console.error("Error creating new product:", error);
      setSnackbar({children: "Couldn't create a new product", severity: "error"});
    }
  }

  const handleUpdateApi = async (subFormState) => {
    try{
      const response = await cdmApi.updateUser(subFormState);
      //setRows(rows.map((row) => (row === rowToEdit ? response.data : row)));
      setDataChangeFlag(!dataChangeFlag);
      setSnackbar({ children: "Updated successfully", severity: "success" });
      setRowToEdit(null);
    }
    catch(error){
      console.error("Error updating product:", error);
      setSnackbar({ children: "Couldn't update product", severity: "error" });
    }
  }

  const handleDeleteApi = async () => {
    try {
      await cdmApi.deleteUser(deletingId);
      //setRows(rows.filter((row) => row.id !== deletingId));
      setDataChangeFlag(!dataChangeFlag);
      setSnackbar({ children: "Deleted successfully", severity: "success" });
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }


  const renderConfirmDialog = () => {
    if (!popupOpen) {
      return null;
    }

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={popupOpen} 
      >
        <DialogTitle style={{display: "flex",}}>
          <WarningIcon className='text-yellow-500 mx-auto' style={{fontSize : "50px"}}/>
        </DialogTitle>

        <DialogContent dividers>
          {popupMessage}
          
        </DialogContent>

        <DialogActions>
          <div className='flex gap-6'>
            <button className=' bg-white border-2 border-gray-400 hover:bg-[#a1a3a2] hover:text-white rounded-md text-black font-medium w-[50px]  my-0 py-[6px]'  onClick={handleNo}>
              No
            </button>
            <button className='text-white bg-[#6A64F1] hover:bg-[#a5a2d4] rounded-md font-medium w-[50px]  my-0 py-[6px]' onClick={handleYes}>
              Yes
            </button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };


  //Function button
  const handleEditClick = (id) => () => {
    setRowToEdit(rows.find((row) => row.id === id));
    setModalOpen(true);
  };



  const handleDeleteClick = (id) => async () => {
    console.log(id);  
    setDeletingId(id);
    setPopupMessage(`Do you really want to delete this car?`);
    setPopupOpen(true);
  };



  //customizer columns
  const columns = [
    //{ field: "id", headerName: "ID" },
    {
      field: "index",
      headerName: "ID",
      width: 50,
      renderCell: (params) => {
        return <div className='dark:text-white'>{params.row.index}</div>;
      },
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 120,
      cellClassName: "image-column--cell dark:text-white",
      renderCell: (params) => {
        return (
          <div >
            {(params.row.avatar && params.row.avatar.length > 10 ) ? 
              (
                <img
                  className="rounded-full w-[50px]"
                  src={params.row.avatar}
                  alt="avatar"
                />
              ) :
              (
                <img
                  className="rounded-full w-[50px]"
                  src="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                  alt="avatar"
                />
              )
            }
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Name",
      width: 180,
      cellClassName: "name-column--cell dark:text-white",
      editable: true,
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 100,
    //   headerAlign: "left",
    //   align: "left",
    //   editable: true,
    // },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 160,
      editable: true,
      cellClassName: "dark:text-white"
    },
    {
      field: "name",
      headerName: "Email",
      width: 220,
      editable: true,
      cellClassName: "dark:text-white"
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      editable: true,
      cellClassName: "dark:text-white"
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 80,
      cellClassName: 'actions dark:text-white',
      getActions: ({ id }) => {
  
        return [
          <GridActionsCellItem
          icon={<EditIcon className='bg-[#1F2937] text-white dark:bg-blue-500 dark:hover:bg-;ue-700 rounded-md box-content p-[4px]
                                       hover:bg-[#455265]'/>}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon className='bg-red-600 text-white rounded-md box-content p-[4px]
                                         hover:bg-red-400'/>}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  

  //render
  return (
    <div className="flex dark:bg-slate-800">
      <ManagerSideBar/>
      { modalOpen && ( 
      <CustomerModalForm 
        closeModel={() => {setModalOpen(false); setRowToEdit(null);}}
        defaultValues={rowToEdit}        
        onSubmit={handleSubmit}
      />
      )}

      <div className='ml-8 flex-1 flex flex-col overflow-x-hidden'>
        <div className="pt-8 w-full">
          <p className="text-4xl  font-bold dark:text-white">Customer</p>
        </div>
        <button className='dark:bg-blue-500 dark:hover:bg-blue-700 self-end mr-[50px] mb-0 bg-[#000] hover:bg-[#6d7986] rounded-md text-white font-bold w-[150px] max-sm:ml-0 my-2 py-2 max-lg:self-start max-lg:mt-[40px]' 
                onClick={() => {setModalOpen(true);}}>CREATE NEW</button>
        
        {/* Data Grid */}
        <div className="mt-[15px]">
          {renderConfirmDialog()}
          <Box height="544px" width="100%"  
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                backgroundColor: 'white',
                borderRadius: '8px',
                '.dark &': {
                  backgroundColor: '#272727',
                },
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
                fontSize: '12px',
                color: 'black',
                '.dark &': {
                  color: 'white',
                },
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#607286',
                color: '#fff',
                borderBottom: 'none',
                fontSize: '14px',
                borderRadius: '8px 8px 0 0',
                '.dark &': {
                  backgroundColor: '#474747',
                },
              },
              '& .MuiDataGrid-footerContainer': {
                borderRadius: '0 0 8px 8px',
              },
              '& .MuiDataGrid-virtualScroller': {},
              '& .MuiDataGrid-row--editing .MuiDataGrid-cell': {
                boxShadow:
                  '0px 4px 1px 0px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px -8px 10px 0px rgba(0,0,0,0.12) !important',
              },
              '& .MuiCheckbox-root': {
                color: `#294bd6 !important`,
                '.dark &': {
                  color: `#8ab4f8 !important`,
                },
              },
              '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
              '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
              {
                outline: 'none !important',
              },
              '& .MuiTablePagination-displayedRows': {
                color: 'black', 
                '.dark &': {
                  color: '#fff', 
                },
              },
              '& .MuiTablePagination-selectLabel': {
                color: 'black',
                '.dark &': {
                  color: '#fff', 
                },
              },
              '& .MuiSelect-select': {
                color: 'black', 
                '.dark &': {
                  color: '#fff', 
                },
                '&.Mui-focused': {
                  backgroundColor: 'transparent', 
                },
                '&:focus': {
                  backgroundColor: 'transparent', 
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              },
              '& .MuiTablePagination-selectIcon': {
                color: 'black',
                '.dark &': {
                  color: '#fff', 
                },
              },
              '& .MuiTablePagination-actions button': {
                color: 'black',
                '.dark &': {
                  color: '#fff', 
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                  '.dark &': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  },
                },
              },
              '& .MuiTablePagination-toolbar': {
                borderTop: '1px solid rgba(224, 224, 224, 1)',
                '.dark &': {
                  borderTop: '1px solid rgba(224, 224, 224, 0.2)', 
                },
              },
              '& .MuiTablePagination-root': {
                borderTop: '1px solid rgba(224, 224, 224, 1)',
                '.dark &': {
                  borderTop: '1px solid rgba(224, 224, 224, 0.2)', 
                },
              },
              // Styling the GridToolbar (for light and dark modes)
              '& .MuiDataGrid-toolbarContainer': {
                padding: '0.5rem',
                backgroundColor: 'white', // Light mode background
                '.dark &': {
                  backgroundColor: '#333333', // Dark mode background
                },
                '& .MuiButton-text': {
                  color: 'black', // Light mode text
                  '.dark &': {
                    color: 'white', // Dark mode text
                  },
                },
                '& .MuiInputBase-root': { // Quick filter input
                  color: 'black', // Light mode text
                  backgroundColor: 'rgba(0, 0, 0, 0.05)', // Subtle background in light mode
                  '.dark &': {
                    color: 'white', // Dark mode text
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle background in dark mode
                  },
                },
                '& .MuiSvgIcon-root': { // Icons
                  color: 'black',
                  '.dark &': {
                    color: 'white',
                  }
                }
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              rowCount={totalElements}
              loading={loading}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              sortModel={sortModel}
              onPaginationModelChange={(model) => {
                setPage(model.page);
                setPageSize(model.pageSize);
              }}
              onSortModelChange={(model) => {
                if (model.length) {
                  setSortModel(model);
                } else {
                  setSortModel([{ field: 'index', sort: 'asc' }]);
                }
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },                
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                columnsPanel: {
                  disableHideAllButton: true,
                  disableShowAllButton: true,
                },
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              disableDensitySelector
              isCellEditable={() => false}
              
            />
            {!!snackbar && (
              <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ManageCustomerPage;
