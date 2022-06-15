import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../components/icons";
export default function Header() {
  const localValue = localStorage.getItem("user_information");
  const information = localValue ? JSON.parse(localValue) : {};
  return (
    <header className="header">
      <i className="fa-solid fa-bars header-bar"></i>
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <Link to={`/profile/${information.username}`} className="d-flex justify-content-end w-100 header-link">
        <div className="header-author">
          <span className="header-name">{information.email}</span>
          <div className="header-avatar">
            <img
              src={information.image || ""}
              alt=""
              className="header-thumb"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = require("assets/images/default-avatar.png");
              }}
            />
          </div>
        </div>
      </Link>
    </header>
  );
}
