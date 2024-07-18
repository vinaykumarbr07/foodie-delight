import Dialog from '@mui/material/Dialog'
import { useContext, useState } from "react";
import HandleDialog from "../utils/HandleDialog";
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const CustomDialog = () => {
    const {isDialogOpen, setDialogOpen} = useContext(HandleDialog);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () =>{
        console.log(name, description, location)
        if (name.length > 0 && description.length > 0 && location.length > 0) {
            updateRecords()
        }
        setDialogOpen(false);
    }

    const updateRecords = async () => {
        const response = await fetch('http://localhost:5111/restaurants', {
            method: "POST",
            body: JSON.stringify({ id: Math.floor((Math.random()*1000)+1), name: name, description: description, location: location }),
        })

        if (response.ok) {
            <Alert severity="info">Record Inserted</Alert>
        } else {
            <Alert severity="info">Failed to insert record</Alert>
        }
    }
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
        <TextField  style = {{display: 'block', margin: '3vw 5vw'}} onChange={(e)=> setName(e.target.value)} id="outlined-basic" label="Restaurant Name"variant="outlined" />
        <TextField style = {{display: 'block', margin: '3vw 5vw'}} onChange={(e)=> setDescription(e.target.value)} id="outlined-basic" label="Restaurant Description" variant="outlined" />
        <TextField style = {{display: 'block', margin: '3vw 5vw'}} onChange={(e)=> setLocation(e.target.value)} id="outlined-basic" label="Restaurant location" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    )
}

export default CustomDialog;