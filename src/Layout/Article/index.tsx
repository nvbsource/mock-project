import { ArticleDetail } from "models/article.model";
import React from "react";
export interface InforArticleState {
  information: ArticleDetail;
}
export default function Article({ information }: InforArticleState) {
  return (
    <div className="article">
      <div className="article-author">
        <img src={information.author.image} alt="" className="article-avatar" />
        <div className="article-online">
          <h6 className="article-name">{information.author.username}</h6>
          <span className="article-time">{information.createdAt}</span>
        </div>
      </div>
      <div className="article-content">
        <h5 className="article-title">{information.title}</h5>
        <p className="article-descript">{information.description}</p>
        <div className="article-bottom">
          <div className="tags-content">
            {information.tagList.map((item, index) => (
              <span key={index} className="tags-item">
                {item}
              </span>
            ))}
          </div>
          <div className="article-favorite">
            <h6>{information.favoritesCount} likes</h6>
            <button className={`article-heart ${information.favorited ? "active" : ""}`}>
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
