import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";
import { facilities } from "../data";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import "../styles/ListingDetails.scss";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/properties/${listingId}`, {
        method: "GET",
      });

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Failed to fetch listing details", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // Booking calender
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // update selected date range when user makes a selection
    setDateRange([ranges.selection]);
    setIsDateRangeSelected(true)
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // (end-start) gives the results in milliseconds, calculating in days

  // Submit booking
  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();
  const handleSubmit = async () => {

    if (!isDateRangeSelected) {
      // If date range is not selected, return early
      alert("Please select dates.");
      return;
    }
    
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch(`${API_URL}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit booking failed ", err.message);
    }
  };

  // full image view
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openFullImage = (src) => {
    setSelectedImage(src)
    setFullImageOpen(true);
  };

  const closeFullImage = () => {
    setFullImageOpen(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>
        <div className="photos">
          {listing.listingPhotoPaths?.map((photo, index) => (
            <div key={index}>
              <img
                src={`${API_URL}/${photo.replace("public", "")}`}
                alt="Listing photos"
                className="thumbnail"
                onClick={() => openFullImage(`${API_URL}/${photo.replace("public", "")}`)}
              />

              {fullImageOpen && (
                <div className="full-image-view">
                  <span className="close-button" onClick={closeFullImage}>&times;</span>
                  <img
                    src={selectedImage}
                    alt="Listing photos"
                    className="full-image"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.state}, {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`${API_URL}/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt=""
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {React.createElement(
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    )}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calender">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  &#8377;{listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  &#8377;{listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total Price: &#8377; {listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <button className="btn" onClick={handleSubmit}>
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
