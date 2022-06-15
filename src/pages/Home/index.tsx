import { useAppSelector } from "app/hooks";
import {
  fetchArticlesByTag,
  fetchArticlesGlobal,
  fetchArticlesYouFeed,
  selectArticles,
  selectFetchArticleByTagLoading,
  selectFetchArticleGlobalLoading,
  selectFetchArticleYouFeedLoading,
  selectLimit,
} from "features/article/articleSlice";
import { addTag, fetchTags, removeTag, selectTagsList, selectTagsSearchList } from "features/tag/tagSlice";
import { Article, Tags } from "Layout";
import PaginationList from "Layout/PaginationList/PaginationList";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import ArticleLoading from "../../Layout/Article/ArticleLoading";
import ModalForm from "../../Layout/Article/ModalForm";

export default function Home() {
  const dispatch = useAppDispatch();
  const localValue = localStorage.getItem("user_information");
  const information = localValue ? JSON.parse(localValue) : {};
  const [showModal, setShowModal] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const articleList = useAppSelector(selectArticles);
  const tagsList = useAppSelector(selectTagsList);
  const loadingFeed = useAppSelector(selectFetchArticleYouFeedLoading);
  const loadingGlobal = useAppSelector(selectFetchArticleGlobalLoading);
  const loadingByTag = useAppSelector(selectFetchArticleByTagLoading);
  const limit = useSelector(selectLimit);
  const offset = Number(currentPage) * limit - limit;
  const searchTag = useSelector(selectTagsSearchList);
  const [active, setActive] = useState({
    one: {
      name: "You feed",
      active: information.username ? true : false,
    },
    two: {
      name: "Global feed",
      active: information.username ? false : true,
    },
  });
  useEffect(() => {
    if (active.one.active && !searchTag) {
      dispatch(fetchArticlesYouFeed({ limit, offset }));
    } else if (active.two.active && !searchTag) {
      dispatch(fetchArticlesGlobal({ limit, offset }));
    }
  }, [dispatch, active, currentPage, limit, offset, searchTag]);
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);
  useEffect(() => {
    if (searchTag) {
      setActive((prevState) => ({
        ...prevState,
        one: { ...prevState.one, active: false },
        two: { ...prevState.two, active: false },
      }));
      dispatch(fetchArticlesByTag({ limit, offset, tag: searchTag }));
    }
  }, [dispatch, searchTag, limit, offset]);
  const handleAddTag = (tag: string) => {
    dispatch(addTag(tag));
    setSearchParams({});
  };
  const handleYouFeed = () => {
    setSearchParams({});
    dispatch(removeTag());
    setActive((prevState) => ({
      ...prevState,
      one: {
        name: "You feed",
        active: true,
      },
      two: {
        name: "Global feed",
        active: false,
      },
    }));
  };
  const handleGlobal = () => {
    setSearchParams({});
    dispatch(removeTag());
    setActive((prevState) => ({
      ...prevState,
      one: {
        name: "You feed",
        active: false,
      },
      two: {
        name: "Global feed",
        active: true,
      },
    }));
  };
  const renderArticles = () => {
    if (articleList.length > 0) {
      return articleList.map((item, index) => <Article key={index} information={item} />);
    } else {
      return <div className="article-notfound">There are no article</div>;
    }
  };
  return (
    <Fragment>
      <ul className="profile-menu home-menu">
        {information.username && (
          <li className={`${active["one"].active ? "active" : ""}`} onClick={handleYouFeed}>
            <i className="fa-solid fa-rss"></i> You feed
          </li>
        )}
        <li className={`${active["two"].active ? "active" : ""}`} onClick={handleGlobal}>
          <i className="fa-solid fa-rss"></i> Global Feed
        </li>
        {searchTag && (
          <li className="active">
            <i className="fa-solid fa-rss"></i> {searchTag}
          </li>
        )}
      </ul>
      <main className="feed">
        <div className="feed-body">
          {information.username && (
            <div className="article-add">
              <div className="article-what" onClick={() => setShowModal(true)}>
                Bạn đang nghĩ gì?
              </div>
            </div>
          )}

          <div className="articles">
            {loadingGlobal || loadingFeed || loadingByTag ? (
              <Fragment>
                <ArticleLoading />
                <ArticleLoading />
                <ArticleLoading />
              </Fragment>
            ) : (
              renderArticles()
            )}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <PaginationList limit={limit} />
          </div>
        </div>
        <div className="tags">
          <header className="tags-header">
            <span>Tags</span>
            <i className="fa-solid fa-ellipsis" />
          </header>
          <div className="tags-body">
            <div className="tags-content">
              <Tags data={tagsList} handleAddTag={handleAddTag} />
            </div>
          </div>
        </div>
      </main>
      <ModalForm show={showModal} callbackSetShow={setShowModal} />
    </Fragment>
  );
}
