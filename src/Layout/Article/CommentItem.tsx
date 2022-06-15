import { useAppDispatch } from "app/hooks";
import { deleteComment } from "features/comment/commentSlice";
import { Comment } from "models/article.model";
import React from "react";
import Moment from "react-moment";

export default function CommentItem({ comment, slug }: { comment: Comment; slug: string }) {
  const localValue = localStorage.getItem("user_information");
  const information = localValue ? JSON.parse(localValue) : {};
  const dispatch = useAppDispatch();
  const handleDeleteComment = (idComment: number) => {
    dispatch(deleteComment({ slug: slug as string, idComment: idComment }));
  };
  return (
    <div className="comments-item">
      <div className="comments-author">
        <img src={comment.author.image} alt="" className="comments-avatar" />
        <h6 className="comments-name">{comment.author.username}</h6>
        <span className="comments-date">
          <Moment format="YYYY/MM/DD hh:mm:ss">{comment.createdAt}</Moment>
        </span>
      </div>
      <p className="comments-content">{comment.body}</p>
      {information.username === comment.author.username && (
        <i className="fa-solid fa-trash-can comments-delete" onClick={() => handleDeleteComment(comment.id)}></i>
      )}
    </div>
  );
}
