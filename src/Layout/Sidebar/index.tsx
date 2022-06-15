import { logout } from "features/auth/authSlice";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
export default function Navbar() {
  const localValue = localStorage.getItem("user_information");
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
      {information.username && (
        <NavLink to={`/profile/${information.username}`} className="sidebar-item">
          <i className="fa-solid fa-address-card icon-profile"></i>
          <span>Profile</span>
        </NavLink>
      )}
      <NavLink to="/setting" className="sidebar-item">
        <i className="fa-solid fa-gear icon-setting"></i>
        <span>Setting</span>
      </NavLink>
      {information.username ? (
        <div className="sidebar-item" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </div>
      ) : (
        <Link to="/login" className="sidebar-item">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Login</span>
        </Link>
      )}
    </nav>
  );
}
