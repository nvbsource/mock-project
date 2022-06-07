import { useAppSelector } from "app/hooks";
import {
  fetchArticlesFavorite,
  selectArticles,
  selectFetchArticleFavoriteLoading,
} from "features/article/articleSlice";
import { Article, ArticleLoading } from "Layout";
import React, { Fragment, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
const localValue = localStorage.getItem("access_token");
export default function FavoriteArticles() {
  const information = localValue ? JSON.parse(localValue) : {};
  const dispatch = useAppDispatch();
  const articleList = useAppSelector(selectArticles);
  const loading = useAppSelector(selectFetchArticleFavoriteLoading);
  useEffect(() => {
    dispatch(fetchArticlesFavorite(information.username));
  }, [dispatch, information.username]);
  return (
    <div className="articles">
      {loading ? (
        <Fragment>
          <ArticleLoading />
          <ArticleLoading />
          <ArticleLoading />
          <ArticleLoading />
        </Fragment>
      ) : (
        <Fragment>
          {articleList.length > 0 ? (
            articleList?.map((item, index) => <Article key={index} information={item} />)
          ) : (
            <div className="article-notfound">There are no article</div>
          )}
        </Fragment>
      )}
    </div>
  );
}
