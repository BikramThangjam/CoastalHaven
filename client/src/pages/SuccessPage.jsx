import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage after 3 seconds
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div style={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          padding: "3rem 2rem",
          flex: 1,
        }}
      >
        <h1>Payment Successful</h1>
        <p>Your payment was successful. Thank you!</p>
        <p>Redirecting, please wait...</p>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default SuccessPage;
