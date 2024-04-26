import "../styles/Navbar.scss";
import * as variables from "../styles/variables.scss";

import React, { useState } from "react";
import { Icon, IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";

import { API_URL } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input type="text" placeholder="search..." name="" id="" />
        <IconButton>
          <Search sx={{ color: "#F8395A" }} />
        </IconButton>
      </div>
      <div className="navbar_right ">
        {user ? (
          <a className="host" href="/create-listing">
            Become a Host
          </a>
        ) : (
          <a className="host" href="/login">
            Become a Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        >
          <Menu sx={{ color: "#F8395A" }} />
          {!user ? (
            <Person sx={{ color: "#F8395A" }} />
          ) : (
            <img
              src={`${API_URL}/${user.profileImagePath.replace("public", "")}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropDownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Login</Link>
            <Link to="/register">Singup</Link>
          </div>
        )}

        {dropDownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="">Trip List</Link>
            <Link to="">Wishlist</Link>
            <Link to="">Property List</Link>
            <Link to="">Reservation List</Link>
            <Link to="">Become a Host </Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
