import { useEffect, useState } from "react";
import '../App.css'
import RestaurantCard from "./ResturantCard";
const RestaurantInfo = () =>{
    const [restuarants, setRestuarants] = useState([]);

    useEffect(()=>{
        fetchRestaurantInfo();
    },[])

    const fetchRestaurantInfo = async () => {
        const response = await fetch('http://localhost:5111/restaurants');
        const json = await response.json();
        setRestuarants(json);
    }

    return (
        <div className="restuarant-info">
            {restuarants.length ? restuarants.map(restuarant => <RestaurantCard key = {restuarant.id} restuarantDetail = {restuarant}/> ) : <h1>No Restaurant Found at the moment</h1>}
        </div>
    )
}

export default RestaurantInfo;