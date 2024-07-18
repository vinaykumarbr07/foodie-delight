import { Button } from "@mui/material";
import RestaurantInfo from "./RestuarantInfo"
import '../App.css';
import { useContext } from "react";
import HandleDialog from "../utils/HandleDialog";
import CustomDialog from "./Dialog";

const Body = () =>{
    const {isDialogOpen, setDialogOpen} = useContext(HandleDialog);

    const addRestaurantInfo = () =>{
        if (!isDialogOpen){
            setDialogOpen(true);
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