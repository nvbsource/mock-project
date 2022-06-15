import { useAppSelector } from "app/hooks";
import {
  fetchArticlesByAuthor,
  fetchArticlesFavoriteByAuthor,
  selectArticles,
  selectLoadingFetchArticleByAuthor,
  selectLoadingFetchArticleFavoriteByAuthor,
} from "features/article/articleSlice";
import { fetchProfile, selectLoadingProfile } from "features/profile/profileSlice";
import { Article, ArticleLoading } from "Layout";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Information from "./Information";
import InformationLoading from "./InformationLoading";
export default function Profile() {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const loading = useAppSelector(selectLoadingProfile);
  const loadingArticles = useAppSelector(selectLoadingFetchArticleByAuthor);
  const loadingArticlesFavorite = useAppSelector(selectLoadingFetchArticleFavoriteByAuthor);
  const articleList = useAppSelector(selectArticles);

  const [active, setActive] = useState({
    one: {
      name: "My Articles",
      active: true,
    },
    two: {
      name: "Favorited Articles",
      active: false,
    },
  });
  useEffect(() => {
    dispatch(fetchProfile(slug as string));
    dispatch(fetchArticlesByAuthor(slug as string));
  }, [dispatch, slug]);
  return (
    <div className="profile">
      <Fragment>
        {loading ? <InformationLoading /> : <Information />}
        <ul className="profile-menu">
          <li
            className={`${active["one"].active ? "active" : ""}`}
            onClick={() => {
              dispatch(fetchArticlesByAuthor(slug as string));
              setActive((prevState) => ({
                ...prevState,
                one: {
                  ...prevState.one,
                  active: true,
                },
                two: {
                  ...prevState.two,
                  active: false,
                },
              }));
            }}
          >
            <i className="fa-solid fa-rss"></i> {active["one"].name}
          </li>
          <li
            className={`${active["two"].active ? "active" : ""}`}
            onClick={() => {
              dispatch(fetchArticlesFavoriteByAuthor(slug as string));
              setActive((prevState) => ({
                ...prevState,
                one: {
                  ...prevState.one,
                  active: false,
                },
                two: {
                  ...prevState.two,
                  active: true,
                },
              }));
            }}
          >
            <i className="fa-solid fa-braille"></i> {active["two"].name}
          </li>
        </ul>
        <div className="profile-feed mt-3">
          {loadingArticles || loadingArticlesFavorite ? (
            <ArticleLoading />
          ) : articleList.length > 0 ? (
            articleList?.map((item, index) => <Article key={index} information={item} />)
          ) : (
            <div className="article-notfound">There are no article</div>
          )}
        </div>
      </Fragment>
    </div>
  );
}
