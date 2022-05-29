import { Article } from "Layout";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ArticlesFeed from "../Article/pages/ArticlesFeed";
import { useAppSelector } from "app/hooks";
import { useAppDispatch } from "../../app/hooks";
import { selectLoading } from "features/article/articleSlice";
import { getListArticles } from "features/article/articleSlice";
import { selectListArticles } from "../../features/article/articleSlice";

export default function Home() {
  const loading = useAppSelector(selectLoading);
  const listArticles = useAppSelector(selectListArticles);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListArticles());
  }, []);
  return (
    <>
      <main className="feed">
        <div className="feed-body">
          <ArticlesFeed loading={loading} data={listArticles} />
        </div>
        <div className="tags">
          <header className="tags-header">
            <span>Tags</span>
            <i className="fa-solid fa-ellipsis"></i>
          </header>
          <div className="tags-body">
            <Form className="mb-3">
              <Form.Control type="text" placeholder="enter your search tags..." />
            </Form>
            <div className="tags-content">
              <span className="tags-item">implements</span>
              <span className="tags-item">react</span>
              <span className="tags-item">angular</span>
              <span className="tags-item">global</span>
              <span className="tags-item">discovery</span>
              <span className="tags-item">games</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
