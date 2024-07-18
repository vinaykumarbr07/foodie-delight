import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import {setDialogOpen, setRestauranInfo, setRecordUpdated} from '../utils/restaurantSlice';

const RestaurantCard = ({restuarantDetail}) => {
    const {name, description, location, id } = restuarantDetail;
    const dispatch = useDispatch();
    const isDialogOpen = useSelector(store=> store.resReducer.isDialogOpen);

    const editRestaurantInfo = (e) => {
        if (!isDialogOpen) {
            dispatch(setRestauranInfo({id, name, description, location}));
            dispatch(setDialogOpen(true));
        }
    }

    const deleteRestaurantInfo = (e) => {
        deleteRecord(Number(e.currentTarget.getAttribute('data-id')));
    }

    const deleteRecord = async (restaurantId) => {
        const response = await fetch(`http://localhost:5111/restaurants/${restaurantId}`, { method: "DELETE" })

        if (response.ok) {
            <Alert severity="info">Record Deleted</Alert>
            dispatch(setRecordUpdated(true));
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