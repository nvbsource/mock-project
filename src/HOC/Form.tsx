import React from "react";
interface PropsState {
  title: string;
  desc: string;
  Component: JSX.Element;
}
export default function Form({ Component, title, desc }: PropsState) {
  return (
    <div className="form">
      <h2 className="form-caption">{title}</h2>
      <p className="form-desc">{desc}</p>
      <div className="form-body">{Component}</div>
    </div>
  );
}
