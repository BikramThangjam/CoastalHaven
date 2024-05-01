
import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../config";
import {setTripList} from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";


const TripList = () => {
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.user._id);
    const tripList = useSelector(state => state.user.tripList)
    const dispatch = useDispatch();

    const getTripList = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${userId}/trips`, {
                method: "GET"
            })

            const data = await response.json();
           
            dispatch(setTripList(data));
            setLoading(false);

        } catch (err) {
            console.log("Failed to fetch trip list!", err.message);
        }
    }

    useEffect(()=>{
        getTripList();
    },[])


  return loading ? <Loader />  :(
    <>
        <Navbar />
        <h1 className="title-list">Your Trip List</h1>
        <div className="list">
            {
                tripList?.map(({_id, listingId, hostId, startDate, endDate, totalPrice, booking=true}, index) => (
                    <ListingCard 
                        key={index} 
                        id={_id}
                        listingId={listingId._id}
                        creator={hostId._id}
                        listingPhotoPaths={listingId.listingPhotoPaths}
                        city={listingId.city}
                        state={listingId.state}
                        country={listingId.country}
                        category = {listingId.category }
                        startDate={startDate} 
                        endDate={endDate} 
                        totalPrice={totalPrice}
                        booking={booking}
                        
                    />
                ))
            }
        </div>
        <Footer />
    </>
  )
}

export default TripList
