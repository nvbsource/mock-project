import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sidebar">
      <NavLink to="/" className="sidebar-item">
        <i className="fa-solid fa-house-user icon-home"></i>
        <span>Home</span>
      </NavLink>
      <NavLink to="/favorite-articles" className="sidebar-item">
        <i className="fa-solid fa-heart icon-heart"></i>
        <span>Favorite articles</span>
      </NavLink>
      <NavLink to="/profile" className="sidebar-item">
        <i className="fa-solid fa-address-card icon-profile"></i>
        <span>Profile</span>
      </NavLink>
      <NavLink to="/setting" className="sidebar-item">
        <i className="fa-solid fa-gear icon-setting"></i>
        <span>Setting</span>
      </NavLink>
      <NavLink to="/logout" className="sidebar-item">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Logout</span>
      </NavLink>
    </nav>
  );
}
