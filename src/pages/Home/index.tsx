import { useAppSelector } from "app/hooks";
import {
  fetchArticlesGlobal,
  fetchArticlesYouFeed,
  selectArticles,
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
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const articleList = useAppSelector(selectArticles);
  const tagsList = useAppSelector(selectTagsList);
  const searchTags = useSelector(selectTagsSearchList);
  const loadingFeed = useAppSelector(selectFetchArticleYouFeedLoading);
  const loadingGlobal = useAppSelector(selectFetchArticleGlobalLoading);
  const limit = useSelector(selectLimit);
  const offset = Number(currentPage) * limit - limit;
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);
  const handleRemoveTag = (tag: string) => {
    dispatch(removeTag(tag));
  };
  const handleAddTag = (tag: string) => {
    dispatch(addTag(tag));
  };
  const renderArticles = () => {
    const list =
      searchTags.length > 0
        ? articleList.filter((item) => item.tagList.some((tag) => searchTags.find((search) => search === tag)))
        : articleList;
    if (list.length > 0) {
      return list?.map((item, index) => <Article key={index} information={item} />);
    } else {
      return <div className="article-notfound">There are no article</div>;
    }
  };
  return (
    <Fragment>
      <ul className="profile-menu home-menu">
        {information.username && (
          <li
            className={`${active["one"].active ? "active" : ""}`}
            onClick={() => {
              setSearchParams({});
              dispatch(fetchArticlesYouFeed({ limit, offset: 0 }));
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
            }}
          >
            <i className="fa-solid fa-rss"></i> You feed
          </li>
        )}
        <li
          className={`${active["two"].active ? "active" : ""}`}
          onClick={() => {
            setSearchParams({});
            dispatch(fetchArticlesGlobal({ limit, offset: 0 }));
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
          }}
        >
          <i className="fa-solid fa-rss"></i> Global Feed
        </li>
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
          <div className="tags-content  mb-2">
            {searchTags.map((item) => (
              <div className="tags-item tags-search" onClick={() => handleRemoveTag(item)}>
                <span>{item}</span>
                <i className="fa-solid fa-trash-can tags-close"></i>
              </div>
            ))}
          </div>

          <div className="articles">
            {loadingGlobal || loadingFeed ? (
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
            <PaginationList limit={limit} offset={offset} pageActive={active} />
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
