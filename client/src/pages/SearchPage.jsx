import React, { useEffect, useState } from 'react';
import "../styles/List.scss";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config';
import { setListings } from '../redux/state';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const SearchPage = () => {
    const [loading, setLoading] = useState(true)
    const {search} = useParams();
    const listings = useSelector(state => state.listings);
    const dispatch = useDispatch();

    const getSearchListings = async () => {
        try {
            const response = await fetch(`${API_URL}/properties/search/${search}`, {
                method: "GET"
            })

            const data = await response.json();
            dispatch(setListings({listings: data}));
            setLoading(false);

        } catch (err) {
            console.log("Failed to fetch search list". err,message)
        }
    }

    useEffect(()=>{
        getSearchListings();
    }, [search])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">{search} results</h1>
      <div className="list">
        {listings.map(
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
  )
}

export default SearchPage
