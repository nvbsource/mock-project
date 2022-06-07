import { useAppDispatch, useAppSelector } from "app/hooks";
import { followProfile, selectAuthor, selectLoadingFollowProfile } from "features/profile/profileSlice";
import React from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const localValue = localStorage.getItem("access_token");
export default function Information() {
  const information = localValue ? JSON.parse(localValue) : {};
  const author = useAppSelector(selectAuthor);
  const loadingFollow = useAppSelector(selectLoadingFollowProfile);
  const dispatch = useAppDispatch();
  const handleFollow = () => {
    const type = author.following ? "unfollow" : "follow";
    dispatch(followProfile({ username: author.username, type }));
  };
  return (
    <div className="profile-information">
      <img
        src={author?.image}
        alt=""
        className="profile-avatar"
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = require("assets/images/default-avatar.png");
        }}
      />
      <div className="profile-detail">
        <div className="profile-action">
          <span className="profile-name">{author?.username}</span>
          {information.username === author?.username ? (
            <Link to="/setting" className="profile-edit">
              Edit profile
            </Link>
          ) : (
            <button className="profile-edit" onClick={handleFollow}>
              {author?.following ? "Unfollow" : "Follow"} {author?.username}{" "}
              {loadingFollow && <Spinner animation="border" size="sm" />}
            </button>
          )}
        </div>
        <div className="profile-couter">
          <span>
            <b>0</b> Bài viết
          </span>
          <span>
            <b>0</b> Người theo giõi
          </span>
          <span>
            Đang theo dõi <b>0</b> người dùng
          </span>
        </div>
      </div>
    </div>
  );
}
