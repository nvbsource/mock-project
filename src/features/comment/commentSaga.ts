import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { CommentUpload } from "models/article.model";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import apiArticle from "services/articles.service";
import {
  addComment,
  addCommentSuccess,
  fetchCommentsFailed,
  fetchComments,
  fetchCommentsSuccess,
  deleteComment,
  deleteCommentSuccess,
  addCommentFailed,
} from "./commentSlice";
function* handleFetchComments(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getCommentsInArticle, action.payload);
    yield put(fetchCommentsSuccess(response.data.comments));
  } catch (e) {
    yield put(fetchCommentsFailed("Get data failed"));
  }
}
function* handleAddComment(action: PayloadAction<CommentUpload>) {
  const toastId = toast.loading("Please wait...");
  try {
    const response: AxiosResponse = yield call(apiArticle.addCommentToArticle, action.payload);
    yield put(addCommentSuccess(response.data.comment));
    yield toast.update(toastId, {
      render: "Add comment successfull",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
  } catch (e: any) {
    yield put(addCommentFailed());
    const errors = Object.keys(e.response.data.errors);
    let content = "";
    errors.forEach((key: any) => {
      content += `${key}: ${e.response.data.errors[key]}`;
    });
    yield toast.update(toastId, {
      render: content,
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  }
}
function* handleDeleteComment(action: PayloadAction<{ slug: string; idComment: number }>) {
  const toastId = toast.loading("Please wait...");
  try {
    yield call(apiArticle.deleteCommentInArticle, action.payload.slug, action.payload.idComment);
    yield put(deleteCommentSuccess(action.payload.idComment));
    yield toast.update(toastId, {
      render: "Delete comment successfull",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
  } catch (e) {
    yield toast.update(toastId, {
      render: "Delete comment failed",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  }
}
function* commentSaga() {
  yield takeLatest(fetchComments.type, handleFetchComments);
  yield takeLatest(addComment.type, handleAddComment);
  yield takeLatest(deleteComment.type, handleDeleteComment);
}
export default commentSaga;
