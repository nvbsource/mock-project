import React from "react";
import { Header, Sidebar } from "../index";
import { Props } from "../../../app/interface";
export default function DefaultLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="main">{children}</div>
      </div>
    </div>
  );
}
