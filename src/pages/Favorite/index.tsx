import { useAppSelector } from "app/hooks";
import {
  fetchArticlesFavoriteByAuthor,
  selectArticles,
  selectLoadingFetchArticleFavoriteByAuthor,
} from "features/article/articleSlice";
import { Article, ArticleLoading } from "Layout";
import React, { Fragment, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
export default function FavoriteArticles() {
  const localValue = localStorage.getItem("user_information");
  const information = localValue ? JSON.parse(localValue) : {};
  const dispatch = useAppDispatch();
  const articleList = useAppSelector(selectArticles);
  const loading = useAppSelector(selectLoadingFetchArticleFavoriteByAuthor);
  useEffect(() => {
    dispatch(fetchArticlesFavoriteByAuthor(information.username));
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
