import { useEffect, useState } from "react";
import '../App.css'
import RestaurantCard from "./ResturantCard";
import { useSelector, useDispatch } from "react-redux";
import { setRecordUpdated } from "../utils/restaurantSlice";

const RestaurantInfo = () =>{
    const [restuarants, setRestuarants] = useState([]);
    const isRecordUpdated = useSelector(store => store.resReducer.isRecordUpdated);
    const dispatch = useDispatch();

    useEffect(()=>{
        fetchRestaurantInfo();
    },[]);

    useEffect(()=>{
        if (isRecordUpdated) {
            fetchRestaurantInfo();
        }
    }, [isRecordUpdated]);

    const fetchRestaurantInfo = async () => {
        const response = await fetch('http://localhost:5111/restaurants');
        const json = await response.json();
        setRestuarants(json);
        dispatch(setRecordUpdated(false));
    }

    return (
        <div className="restuarant-info">
            {restuarants.length ? restuarants.map(restuarant => <RestaurantCard key = {restuarant.id} restuarantDetail = {restuarant}/> ) : <h1>No Restaurant Found at the moment</h1>}
        </div>
    )
}

export default RestaurantInfo;