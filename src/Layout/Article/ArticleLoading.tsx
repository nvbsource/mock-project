import React from "react";
import { Spinner } from "react-bootstrap";

export default function ArticleLoading() {
  return (
    <div className="article loading">
      <div className="article-author">
        <Spinner animation="grow" />
        <div className="article-online">
          <h6 className="article-name">.................</h6>
          <span className="article-time">........................................</span>
        </div>
      </div>
      <div className="article-content">
        <h5 className="article-title">..............................</h5>
        <p className="article-descript">.................................................................</p>
        <div className="article-bottom">
          <div className="article__tags">
            <span className="article__tags--item">.................</span>
          </div>
          <div className="article-favorite">
            <h6>...</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
