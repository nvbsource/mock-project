import { deleteArticle, favoriteArticle } from "features/article/articleSlice";
import { ArticleLoading } from "Layout";
import { IArticle } from "models/article.model";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import ModalFormEdit from "./ModalFormEdit";
import { addTag } from "features/tag/tagSlice";
export interface InforArticleState {
  information: IArticle;
  detail?: boolean;
}
export default function Article({ information, detail }: InforArticleState) {
  const localValue = localStorage.getItem("user_information");
  const userInformation = localValue ? JSON.parse(localValue) : {};
  const navigate = useNavigate();
  const bodyHTML = useRef<any>();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState<boolean>(false);
  const [slugLoading, setSlugLoading] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<"pending" | "success" | "failed">("failed");
  useEffect(() => {
    if (detail) {
      bodyHTML.current.innerHTML = information.body;
    }
  }, [detail, information]);
  const handleNavigationSlug = (link: string) => {
    navigate(link);
  };
  const handleNavigationProfile = (e: any, link: string) => {
    e.stopPropagation();
    navigate(`/profile/${link}`);
  };

  const handleFavoriteArticle = () => {
    const type = information.favorited ? "unfavorite" : "favorite";
    setSlugLoading(information.slug);
    setLoadingFavorite(true);
    dispatch(
      favoriteArticle({ slug: information.slug, type, setSlugLoading, setLoadingFavorite, detail: detail as boolean })
    );
  };
  const handleDeleteArticle = () => {
    dispatch(deleteArticle({ slug: information.slug, setDeleteLoading }));
  };
  const handleNavigateFetchArticleByTag = (e: any, tag: string) => {
    e.stopPropagation();
    navigate("/");
    dispatch(addTag(tag));
  };
  return (
    <>
      {deleteLoading === "failed" && (
        <div className="article">
          <div className="article-body" onClick={() => handleNavigationSlug(`/article/${information.slug}`)}>
            <div className="article-author">
              <img src={information.author.image} alt="" className="article-avatar" />
              <div className="article-online">
                <h6 className="article-name">
                  <span onClick={(e) => handleNavigationProfile(e, information.author.username)}>
                    {information.author.username}
                  </span>
                </h6>
                <span className="article-time">
                  <Moment format="YYYY/MM/DD hh:mm:ss">{information.createdAt}</Moment>
                </span>
              </div>
            </div>
            <div className="article-content">
              <h5 className="article-title">{information.title}</h5>
              <p className="article-descript">{information.description}</p>
              {detail && <p ref={bodyHTML}></p>}
              <div className="article-bottom">
                <div className="tags-content">
                  {information.tagList.map((item, index) => (
                    <span key={index} className="tags-item" onClick={(e) => handleNavigateFetchArticleByTag(e, item)}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="article-favorite">
            <h6>{information.favoritesCount} likes</h6>
            <button
              className={`article-heart ${information.favorited ? "active" : ""}`}
              onClick={handleFavoriteArticle}
              disabled={loadingFavorite}
            >
              {loadingFavorite && slugLoading === information.slug ? (
                <Spinner animation="grow" />
              ) : (
                <i className="fa-solid fa-heart"></i>
              )}
            </button>
          </div>

          {userInformation.username === information.author.username && detail && (
            <div className="article-action">
              <i className="fa-solid fa-pen-to-square article-edit" onClick={() => setShowModal(true)}></i>
              <i className="fa-solid fa-trash-can article-edit" onClick={handleDeleteArticle}></i>
            </div>
          )}
          <ModalFormEdit show={showModal} callbackSetShow={setShowModal} informationArticle={information} />
        </div>
      )}
      {deleteLoading === "success" && null}
      {deleteLoading === "pending" && <ArticleLoading />}
    </>
  );
}
