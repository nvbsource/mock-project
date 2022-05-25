import React from "react";
import { Props } from "../../../app/interface";
import { logo } from "../../icons/";
import { Link } from "react-router-dom";

export default function DefaultOnlyHeader({ children }: Props) {
  return (
    <div>
      <header className="header">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
      </header>
      <div className="wrapper">{children}</div>
    </div>
  );
}
