import Dialog from '@mui/material/Dialog'
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {setDialogOpen, setRestauranInfo, setRecordUpdated} from '../utils/restaurantSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const CustomDialog = () => {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector(store=> store.resReducer.isDialogOpen);
    const restaurantInfo = useSelector(store=> store.resReducer.restaurantInfo);

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        dispatch(setRestauranInfo({}));
        dispatch(setDialogOpen(false));
    };

    const hadleSave = () => {
        if (restaurantInfo.id) {
          updateRecord(restaurantInfo.id);
        } else {
          addRecord()
        }
        dispatch(setRestauranInfo({}));
        dispatch(setDialogOpen(false));
    };

    const updateRecord = async (resId) => {
      const response = await fetch(`http://localhost:5111/restaurants/${resId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: resId, name: name, description: description, location: location }),
      })

      if (response.ok) {
          <Alert severity="info">Record Inserted</Alert>
          dispatch(setRecordUpdated(true));
      } else {
          <Alert severity="info">Failed to insert record</Alert>
      }
  }

    const addRecord = async () => {
        const response = await fetch('http://localhost:5111/restaurants', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: Math.floor((Math.random()*1000)+1), name: name, description: description, location: location }),
        })

        if (response.ok) {
            <Alert severity="info">Record Inserted</Alert>
            dispatch(setRecordUpdated(true));
        } else {
            <Alert severity="info">Failed to insert record</Alert>
        }
    }

    useEffect(()=> {
        if (restaurantInfo) {
            setName(restaurantInfo.name);
            setDescription(restaurantInfo.description);
            setLocation(restaurantInfo.location);
        }
    }, []);
    
    return (
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isDialogOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Enter Restaurant Detail
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <TextField  style = {{display: 'block', margin: '3vw 5vw'}} value={name} onChange={(e)=> setName(e.target.value)} id="outlined-basic" label="Restaurant Name"variant="outlined" />
        <TextField style = {{display: 'block', margin: '3vw 5vw'}} value={description} onChange={(e)=> setDescription(e.target.value)} id="outlined-basic" label="Restaurant Description" variant="outlined" />
        <TextField style = {{display: 'block', margin: '3vw 5vw'}} value={location} onChange={(e)=> setLocation(e.target.value)} id="outlined-basic" label="Restaurant location" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={hadleSave}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    )
}

export default CustomDialog;