import React from "react";
import { Props } from "../../../app/interface";
import { Header, Sidebar } from "../index";
export default function DefaultLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="main">
        <Sidebar />
        <div className="main-body">{children}</div>
      </div>
    </div>
  );
}
