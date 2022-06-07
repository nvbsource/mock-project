import {
  addCommentArticle,
  deleteComment,
  fetchArticlesGlobal,
  fetchComments,
  selectAddCommentLoading,
  selectArticles,
  selectComments,
  selectFetchCommentLoading,
} from "features/article/articleSlice";
import { Article, ArticleLoading } from "Layout";
import { IArticle } from "models/article.model";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CommentLoading from "../../../Layout/Article/CommentLoading";
const localValue = localStorage.getItem("access_token");
export default function DetailArticle() {
  const information = localValue ? JSON.parse(localValue) : {};
  const [comment, setComment] = useState<string>("");
  const [detailArticle, setArticle] = useState<IArticle>();
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const articles = useAppSelector(selectArticles);
  const comments = useAppSelector(selectComments);
  const loadingComments = useAppSelector(selectAddCommentLoading);
  const loadingFetchComments = useAppSelector(selectFetchCommentLoading);
  useEffect(() => {
    dispatch(fetchArticlesGlobal());
    dispatch(fetchComments(slug as string));
  }, [dispatch, slug]);
  useEffect(() => {
    if (!loadingComments && !loadingFetchComments) {
      setComment("");
    }
  }, [loadingComments, loadingFetchComments]);
  useEffect(() => {
    const articleExist = articles.find((item) => item.slug === slug);
    if (articleExist) {
      setArticle(articleExist);
    }
  }, [slug, articles]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(addCommentArticle({ slug: slug as string, body: comment as string }));
  };
  const handleDeleteComment = (idComment: number) => {
    dispatch(deleteComment({ slug: slug as string, idComment }));
  };
  return (
    <div className="detail">
      {!detailArticle ? <ArticleLoading /> : <Article information={detailArticle} detail={true} />}
      <div className="comments">
        <form className="comments-write" onSubmit={handleSubmit}>
          <input
            type="text"
            className="comments-input"
            placeholder="Enter comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loadingComments || loadingFetchComments}
          />
        </form>
        {loadingComments || loadingFetchComments ? (
          <CommentLoading />
        ) : (
          comments?.map((item, index) => (
            <div key={index} className="comments-item">
              <div className="comments-author">
                <img src={item.author.image} alt="" className="comments-avatar" />
                <h6 className="comments-name">{item.author.username}</h6>
                <span className="comments-date">{item.createdAt}</span>
              </div>
              <p className="comments-content">{item.body}</p>
              {information.username === item.author.username && (
                <i className="fa-solid fa-trash-can comments-delete" onClick={() => handleDeleteComment(item.id)}></i>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
