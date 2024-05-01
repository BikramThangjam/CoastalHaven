import React, { useState, useEffect } from "react";
import "../styles/List.scss";
import { useSelector, useDispatch} from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { API_URL } from "../config";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.user)
    const propertyList = user?.propertyList
    const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
        const response = await fetch(`${API_URL}/users/${user._id}/properties`, {
            method: "GET"
        })

        const data = await response.json()
        dispatch(setPropertyList(data))
        setLoading(false)

    } catch (err) {
        console.log("Failed to fetch property list ", err.message)
    }
  }

  useEffect(()=>{

    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            state,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={_id}
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              state={state}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}

            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
