import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../components/icons";
const localValue = localStorage.getItem("access_token");
export default function Header() {
  const information = localValue ? JSON.parse(localValue) : {};
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="header-search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" className="header-control" placeholder="Search for something here..." />
      </div>
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
    </header>
  );
}
