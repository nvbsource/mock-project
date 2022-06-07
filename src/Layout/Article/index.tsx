import { deleteArticle, favoriteArticle } from "features/article/articleSlice";
import { IArticle } from "models/article.model";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import ModalFormEdit from "./ModalFormEdit";
import { ArticleLoading } from "Layout";
export interface InforArticleState {
  information: IArticle;
  detail?: boolean;
}
const localValue = localStorage.getItem("access_token");
export default function Article({ information, detail }: InforArticleState) {
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

  const handleFavoriteArticle = () => {
    const type = information.favorited ? "unfavorite" : "favorite";
    setSlugLoading(information.slug);
    setLoadingFavorite(true);
    dispatch(favoriteArticle({ slug: information.slug, type, setSlugLoading, setLoadingFavorite }));
  };
  const handleDeleteArticle = () => {
    dispatch(deleteArticle({ slug: information.slug, setDeleteLoading }));
  };
  return (
    <>
      {deleteLoading === "failed" && (
        <div className="article">
          <div className="article-author">
            <img src={information.author.image} alt="" className="article-avatar" />
            <div className="article-online">
              <h6 className="article-name">
                <Link to={`/profile/${information.author.username}`}>{information.author.username}</Link>
              </h6>
              <span className="article-time" onClick={() => handleNavigationSlug(`/article/${information.slug}`)}>
                {information.createdAt}
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
                  <span key={index} className="tags-item">
                    {item}
                  </span>
                ))}
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
            </div>
          </div>
          {userInformation.username === information.author.username && (
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
