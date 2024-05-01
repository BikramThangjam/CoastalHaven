import React from 'react';
import "../styles/Footer.scss";
import {LocationOn, LocalPhone, Email} from "@mui/icons-material"

const Footer = () => {
  return (
    <div className='footer' style={{ boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', paddingTop: '20px', backgroundColor: '#f4f4f4' }}>
      <div className="footer_left">
        <a href="/"><img src="/assets/logo.png" alt="logo" /></a>
      </div>
      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+91 9875674324</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>coastalhaven@support.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  )
}

export default Footer;
