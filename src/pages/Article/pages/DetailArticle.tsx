import { fetchDetailArticle, selectDetailArticle, selectLoadingDetailArticle } from "features/article/articleSlice";
import {
  addComment,
  fetchComments,
  selectComments,
  selectLoading,
  selectLoadingAdd,
} from "features/comment/commentSlice";
import { Article, ArticleLoading } from "Layout";
import CommentItem from "Layout/Article/CommentItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CommentLoading from "../../../Layout/Article/CommentLoading";
export default function DetailArticle() {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const [comment, setComment] = useState<string>("");
  const loadingDetailArticle = useAppSelector(selectLoadingDetailArticle);
  const loadingAddComments = useAppSelector(selectLoadingAdd);
  const loadingFetchComments = useAppSelector(selectLoading);
  const detailArticle = useAppSelector(selectDetailArticle);
  const commentsList = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(fetchDetailArticle(slug as string));
    dispatch(fetchComments(slug as string));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!loadingAddComments && !loadingFetchComments) {
      setComment("");
    }
  }, [loadingAddComments, loadingFetchComments]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(addComment({ slug: slug as string, body: comment as string }));
  };

  return (
    <div className="detail">
      {loadingDetailArticle ? <ArticleLoading /> : <Article information={detailArticle} detail={true} />}
      <div className="comments">
        <form className="comments-write" onSubmit={handleSubmit}>
          <input
            type="text"
            className="comments-input"
            placeholder="Enter comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loadingAddComments}
          />
        </form>
        {loadingFetchComments ? (
          <CommentLoading />
        ) : (
          commentsList.map((item, index) => <CommentItem key={index} slug={slug as string} comment={item} />)
        )}
      </div>
    </div>
  );
}
