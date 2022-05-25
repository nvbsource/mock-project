import React from "react";
import GeneralSetting from "./pages/GeneralSetting";
import { NavLink, Route } from "react-router-dom";

export default function Setting() {
  return (
    <div className="setting">
      <div className="setting-menu">
        <NavLink to="general-setting" className="setting-item">
          <i className="fa-solid fa-user setting-icon"></i>
          <span className="setting-label">General settings</span>
          <i className="fa-solid fa-angle-right setting-angle"></i>
        </NavLink>
        <NavLink to="/general-setting" className="setting-item">
          <i className="fa-solid fa-user setting-icon"></i>
          <span className="setting-label">General settings</span>
          <i className="fa-solid fa-angle-right setting-angle"></i>
        </NavLink>
        <NavLink to="/general-setting" className="setting-item">
          <i className="fa-solid fa-user setting-icon"></i>
          <span className="setting-label">General settings</span>
          <i className="fa-solid fa-angle-right setting-angle"></i>
        </NavLink>
      </div>
      <div className="setting-body">
        <GeneralSetting />
      </div>
    </div>
  );
}
