import { Button } from "@mui/material";
import RestaurantInfo from "./RestuarantInfo"
import '../App.css';
import CustomDialog from "./Dialog";
import { useDispatch, useSelector } from "react-redux";
import {setDialogOpen} from '../utils/restaurantSlice';

const Body = () => {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector(store=> store.resReducer.isDialogOpen);

    const addRestaurantInfo = () =>{
        if (!isDialogOpen){
            dispatch(setDialogOpen(true));
        }
    }

    return (
        <>
            <div className="button">
                <Button variant="contained" size="large" onClick={addRestaurantInfo}>Add Resturant</Button> </div>
                {isDialogOpen && <CustomDialog/>}
            <RestaurantInfo/>
        </>
    )
}

export default Body;