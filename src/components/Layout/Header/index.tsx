import React from "react";
import { avatar, logo } from "../../icons";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="" />
      </div>
      <div className="header-search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" className="header-control" placeholder="Search for something here..." />
      </div>
      <div className="header-author">
        <span className="header-name">Nguyễn Văn Bảo</span>
        <div className="header-avatar">
          <img src={avatar} alt="" />
        </div>
      </div>
    </header>
  );
}
