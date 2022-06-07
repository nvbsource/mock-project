import { logout } from "features/auth/authSlice";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
const localValue = localStorage.getItem("access_token");
export default function Navbar() {
  const information = localValue ? JSON.parse(localValue) : {};
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
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
      <NavLink to={`/profile/${information.username}`} className="sidebar-item">
        <i className="fa-solid fa-address-card icon-profile"></i>
        <span>Profile</span>
      </NavLink>
      <NavLink to="/setting" className="sidebar-item">
        <i className="fa-solid fa-gear icon-setting"></i>
        <span>Setting</span>
      </NavLink>
      <div className="sidebar-item" onClick={handleLogout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Logout</span>
      </div>
    </nav>
  );
}
