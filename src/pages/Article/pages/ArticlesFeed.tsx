import { Article } from "Layout";
import React from "react";
import { ArticleDetail } from "models/article.model";
import ArticleLoading from "Layout/Article/ArticleLoading";
export interface ArticleState {
  loading: boolean;
  data: ArticleDetail[];
}
export default function ArticlesFeed({ loading, data }: ArticleState) {
  return (
    <div className="articles">
      {loading ? (
        <>
          <ArticleLoading />
          <ArticleLoading />
          <ArticleLoading />
          <ArticleLoading />
        </>
      ) : (
        <>
          {data?.map((item, index) => (
            <Article key={index} information={item} />
          ))}
        </>
      )}
    </div>
  );
}
