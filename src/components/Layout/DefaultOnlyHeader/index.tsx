import React from "react";
import { Props } from "../../../app/interface";
import { logo } from "../../icons/";

export default function DefaultOnlyHeader({ children }: Props) {
  return (
    <div>
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="" />
        </div>
      </header>
      <div className="wrapper">{children}</div>
    </div>
  );
}
