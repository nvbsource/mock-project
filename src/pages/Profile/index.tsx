import { fetchProfile, selectLoadingProfile } from "features/profile/profileSlice";
import { Article, ArticleLoading } from "Layout";
import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "app/hooks";
import Information from "./Information";
import InformationLoading from "./InformationLoading";
import { selectArticles } from "features/article/articleSlice";
export default function Profile() {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const loading = useAppSelector(selectLoadingProfile);
  const articleList = useAppSelector(selectArticles);
  useEffect(() => {
    dispatch(fetchProfile(slug as string));
  }, [dispatch, slug]);
  return (
    <div className="profile">
      {loading ? (
        <Fragment>
          <InformationLoading />
          <ArticleLoading />
        </Fragment>
      ) : (
        <Fragment>
          <Information />
          <ul className="profile-menu">
            <li className="active">
              <i className="fa-solid fa-braille"></i> My Articles
            </li>
            <li>Favorited Articles</li>
          </ul>
          <div className="profile-feed mt-3">
            {articleList.length > 0 ? (
              articleList?.map((item, index) => <Article key={index} information={item} />)
            ) : (
              <div className="article-notfound">There are no article</div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}
