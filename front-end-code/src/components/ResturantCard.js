import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';
import HandleDialog from "../utils/HandleDialog";
import {useContext}from 'react';
import Alert from '@mui/material/Alert';

const RestaurantCard = ({restuarantDetail}) => {
    const {name, description, location, id } = restuarantDetail;
    const {isDialogOpen, setDialogOpen} = useContext(HandleDialog);

    const editRestaurantInfo = (e) => {
        if (!isDialogOpen) {
            setDialogOpen(true);
        }
    }

    const deleteRestaurantInfo = (e) => {
        deleteRecord(Number(e.currentTarget.getAttribute('data-id')));
    }

    const deleteRecord = async (restaurantId) => {
        const response = await fetch(`http://localhost:5111/restaurants/${restaurantId}`, { method: "DELETE" })

        if (response.ok) {
            <Alert severity="info">Record Deleted</Alert>
        } else {
            <Alert severity="info">Failed to Delete record</Alert>
        }
    }

    return (
        <div className="restuarant">
            <h3 style={{textAlign: 'center'}}>{name}</h3>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <DeleteIcon data-id = {id} onClick={deleteRestaurantInfo}/>
                <EditIcon data-id = {id} onClick ={editRestaurantInfo}/>
            </div>
            <hr/>
            <p>{description}</p>
            <p>{location}</p>
        </div>
    )
}

export default RestaurantCard;