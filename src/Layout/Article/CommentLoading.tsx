import React from "react";
import { Spinner } from "react-bootstrap";

export default function CommentLoading() {
  return (
    <div className="comments-item">
      <div className="comments-author">
        <Spinner animation="grow" />
        <h6 className="comments-name">............</h6>
        <span className="comments-date">..............</span>
      </div>
      <p className="comments-content">...................................................</p>
    </div>
  );
}
