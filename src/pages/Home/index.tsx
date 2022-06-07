import { useAppSelector } from "app/hooks";
import {
  fetchArticlesGlobal,
  fetchArticlesYouFeed,
  fetchTags,
  selectFetchArticleGlobalLoading,
  selectFetchArticleYouFeedLoading,
  selectTags,
} from "features/article/articleSlice";
import { Article, Tags } from "Layout";
import ArticleLoading from "Layout/Article/ArticleLoading";
import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { selectArticles } from "../../features/article/articleSlice";
import ModalForm from "../../Layout/Article/ModalForm";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [searchTag, setSearchTag] = useState<string[]>([]);
  const [active, setActive] = useState({
    one: {
      name: "You feed",
      active: true,
    },
    two: {
      name: "Global feed",
      active: false,
    },
  });
  const loadingFeed = useAppSelector(selectFetchArticleYouFeedLoading);
  const loadingGlobal = useAppSelector(selectFetchArticleGlobalLoading);
  const articleList = useAppSelector(selectArticles);
  const tagsList = useAppSelector(selectTags);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticlesYouFeed());
    dispatch(fetchTags());
  }, [dispatch]);
  const handleRemoveTag = (tag: string) => {
    setSearchTag((prevState) => prevState.filter((item) => item !== tag));
  };
  const handleAddTag = (tag: string) => {
    const existTag = searchTag.includes(tag);
    if (!existTag) {
      return setSearchTag((prev: string[]) => [...prev, tag]);
    }
  };
  const renderArticles = () => {
    const list =
      searchTag.length > 0
        ? articleList.filter((item) => item.tagList.some((tag) => searchTag.find((search) => search === tag)))
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
        <li
          className={`${active["one"].active ? "active" : ""}`}
          onClick={() => {
            dispatch(fetchArticlesYouFeed());
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
        <li
          className={`${active["two"].active ? "active" : ""}`}
          onClick={() => {
            dispatch(fetchArticlesGlobal());
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
          <div className="article-add">
            <div className="article-what" onClick={() => setShowModal(true)}>
              Bạn đang nghĩ gì?
            </div>
          </div>
          <div className="tags-content  mb-2">
            {searchTag.map((item) => (
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
                <ArticleLoading />
              </Fragment>
            ) : (
              <Fragment>{renderArticles()}</Fragment>
            )}
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
