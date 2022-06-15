import React from "react";
import { NavLink } from "react-router-dom";
import GeneralSetting from "./pages/GeneralSetting";

export default function Setting() {
  return (
    <div className="wrapper p-0">
      <div className="setting">
        <div className="setting-menu">
          <NavLink to="/setting" className="setting-item">
            <i className="fa-solid fa-user setting-icon"></i>
            <span className="setting-label">General settings</span>
            <i className="fa-solid fa-angle-right setting-angle"></i>
          </NavLink>
        </div>
        <div className="setting-body">
          <GeneralSetting />
        </div>
      </div>
    </div>
  );
}
