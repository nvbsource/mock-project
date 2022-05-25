import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-item">
        <i className="fa-solid fa-house-user"></i>
        <span>Home</span>
      </NavLink>
      <NavLink to="/profile" className="navbar-item">
        <i className="fa-solid fa-address-card"></i>
        <span>Profile</span>
      </NavLink>
      <NavLink to="/setting" className="navbar-item">
        <i className="fa-solid fa-gear"></i>
        <span>Setting</span>
      </NavLink>
    </nav>
  );
}
