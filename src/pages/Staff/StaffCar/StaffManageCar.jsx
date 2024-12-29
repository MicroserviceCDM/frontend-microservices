import React, { useEffect, useState } from 'react';
import ManagerSideBar from '../../../layouts/components/ManagerSideBar';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, GridLogicOperator } from '@mui/x-data-grid';
import { mockDataTeam } from "./mockData";
import ModalForm from './CarForm';
import axios from 'axios';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';

import WarningIcon from '@mui/icons-material/Warning';
import { cdmApi } from '../../../misc/cdmApi';
import SideBarStaff from '../../../layouts/components/SideBarStaff';


const StaffManageCarPage = () => {

  const [rows, setRows] = React.useState([]);
  const [formState, setFormState] = React.useState(null);
  const [dataChangeFlag, setDataChangeFlag] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:8083/api/v1/products/getAllCars');
        const response = await cdmApi.getAllCars();
        const addedIndexData = response.data.content.map((row, index) => ({ ...row, index: index + 1 }));
        setRows(addedIndexData); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  
  }, [dataChangeFlag]);

  

  const [rowModesModel, setRowModesModel] = React.useState({});

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
      setPopupMessage(`Do you really want to create a new car?`);
    else
      setPopupMessage(`Do you really want to update car's information?`);
    setPopupOpen(true);
  };

  const handleNo = () => {
    setDeletingId(null);
    setPopupOpen(false);
  };

  const handleYes = async () => {
    
    if (deletingId !== null) 
      handleDeleteApi();
    else 
    {
      const formData = new FormData();
      formData.append("file", formState.imgSrc);
      formData.append("upload_preset", "dinhkhoa");

      const resUpload = await axios.post("https://api.cloudinary.com/v1_1/dbixymfbp/image/upload", formData);
      //setFormState({...formState, imgSrc: response.data.secure_url});

      setFormState({...formState, imgSrc: resUpload.data.secure_url});
      const subFormState = {...formState, imgSrc: resUpload.data.secure_url};
      
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

      const response = await cdmApi.createCar(subFormState);

      setRows([...rows, response.data]);
      setDataChangeFlag(!dataChangeFlag);
      setSnackbar({ children: "Updated successfully", severity: "success" });
    } catch (error) {
      console.error("Error creating new product:", error);
      setSnackbar({children: "Couldn't create a new product", severity: "error"});
    }
  }

  const handleUpdateApi = async (subFormState) => {
    try{
      console.log(subFormState);
      const response = await cdmApi.updateCar(subFormState);
      setRows(rows.map((row) => (row === rowToEdit ? response.data : row)));
      setDataChangeFlag(!dataChangeFlag);
      setSnackbar({ children: "Updated successfully", severity: "success" });
    }
    catch(error){
      console.error("Error updating product:", error);
      setSnackbar({ children: "Couldn't update product", severity: "error" });
    }
  }

  const handleDeleteApi = async () => {
    try {
      await cdmApi.deleteCar(deletingId);
      setRows(rows.filter((row) => row.id !== deletingId));
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
    // { field: "id", headerName: "ID" },
    {
      field: "index",
      headerName: "ID",
      width: 50,
      renderCell: (params) => {
        return <div>{params.row.index}</div>;
      },
    },
    {
      field: "imgSrc",
      headerName: "Car",
      width: 150,
      cellClassName: "image-column--cell",
      renderCell: (params) => {
        return (
          <div >
            {params.row.imgSrc && <img className="w-[130px] rounded-md object-cover ml-[-15px]" src={params.row.imgSrc} alt="avatar" />}
          </div>
        );
      },
    },
    {
      field: "trim",
      headerName: "Name",
      width: 210,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "orgPrice",
      headerName: "Original Price",
      width: 120,
      editable: true,
    },
    {
      field: "disPrice",
      headerName: "Discounted Price",
      width: 130,
      editable: true,
    },
    {
      field: "tech",
      headerName: "Technology",
      width: 100,
      editable: true,
    },
    
    {
      field: "count",
      headerName: "Quantity",
      width: 90,
      editable: true,
    },

    {
      field: "model",
      headerName: "Model",
      width: 100,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 80,
      cellClassName: 'actions',
      getActions: ({ id }) => {  
        return [
          <GridActionsCellItem
          icon={<EditIcon className='bg-[#1F2937] text-white rounded-md box-content p-[4px]
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

  const [value, setValue] = React.useState(2);
  //render
  return (
    <div className="flex  bg-white dark:bg-slate-800">
      <SideBarStaff/>
      { modalOpen && ( 
      <ModalForm 
        closeModel={() => {setModalOpen(false); setRowToEdit(null);}}
        defaultValues={rowToEdit}        
        onSubmit={handleSubmit}
      />
      )}

      <div className='ml-8 flex-1 flex flex-col overflow-x-hidden'>
        <div className="pt-8 w-full">
          <p className="text-4xl  text-black dark:text-white font-bold">Car</p>
        </div>
        <button className='self-end mr-[50px] mb-0 bg-[#232331] hover:bg-[#6d7986]  dark:bg-blue-500  dark:hover:bg-blue-700 rounded-md text-white font-bold w-[150px] my-2 py-2  max-lg:self-start max-lg:mt-[50px]' 
                onClick={() => {setModalOpen(true);}}>CREATE NEW</button>
        
        {/* Data Grid */}
        <div className="mt-[15px]">
          {renderConfirmDialog()}
          <Box height="544px" width="100%" maxWidth="100%" sx={{
              "& .MuiDataGrid-root" : {
                border : "none",
              },
              "& .MuiDataGrid-cell" : {
                borderBottom : "none",
                fontSize: '12px',
              },
              "& .name-column--cell" : {
                // color : '#15803D',
              },
              "& .image-column--cell" : {
                fontSize: '40px',
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: '#607286',
                color: '#fff',
                borderBottom: "none",
                fontSize: '14px',
                
              },
              "& .MuiDataGrid-root .MuiDataGrid-row--editing .MuiDataGrid-cell": {
                boxShadow: '0px 4px 1px 0px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px -8px 10px 0px rgba(0,0,0,0.12) !important',
              },
              
              "& .MuiCheckbox-root": {
                color: `${'#294bd6'} !important`,
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
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
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25, page: 0 },
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

export default StaffManageCarPage;
