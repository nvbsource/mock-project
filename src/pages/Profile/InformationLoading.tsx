import React from "react";
import { Spinner } from "react-bootstrap";

export default function InformationLoading() {
  return (
    <div className="profile-information">
      <Spinner animation="grow" className="spinner-big" />
    </div>
  );
}
