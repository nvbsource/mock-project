import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { push } from "redux-first-history";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import apiArticle from "services/articles.service";
import apiTags from "services/tags.service";
import Swal from "sweetalert2";
import { ArticleCreate, CommentUpload, IArticle } from "../../models/article.model";
import {
  addCommentArticle,
  addCommentToArticlefailed,
  addCommentToArticleSuccess,
  createArticle,
  createArticleSuccess,
  DeleteArticle,
  deleteArticle,
  deleteComment,
  editArticle,
  favoriteArticle,
  favoriteArticleFaild,
  favoriteArticleSuccess,
  Favotite,
  fetchArticlesFavorite,
  fetchArticlesFavoriteFailed,
  fetchArticlesFavoriteSuccess,
  fetchArticlesGlobal,
  fetchArticlesGlobalFailed,
  fetchArticlesGlobalSuccess,
  fetchArticlesYouFeed,
  fetchArticlesYouFeedFailed,
  fetchArticlesYouFeedSuccess,
  fetchCommentFailed,
  fetchComments,
  fetchCommentSuccess,
  fetchTags,
  fetchTagsSuccess,
} from "./articleSlice";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
function* handleFetchArticlsGlobal(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getListArticles);
    yield put(fetchArticlesGlobalSuccess(response.data.articles));
  } catch (e) {
    yield put(fetchArticlesGlobalFailed("Get data failed"));
  }
}
function* handleFetchArticlsFeed(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getListArticlesFeed);
    yield put(fetchArticlesYouFeedSuccess(response.data.articles));
  } catch (e) {
    yield put(fetchArticlesYouFeedFailed("Get data failed"));
  }
}
function* handleFetchArticlsFavorite(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getListArticlesFavorite, {
      author: action.payload,
    });
    yield put(fetchArticlesFavoriteSuccess(response.data.articles));
  } catch (e) {
    yield put(fetchArticlesFavoriteFailed("Get data failed"));
  }
}
function* handleFetchComments(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getCommentsInArticle, action.payload);
    yield put(fetchCommentSuccess(response.data.comments));
  } catch (e) {
    yield put(fetchCommentFailed("Get data failed"));
  }
}
function* handleFetchTags() {
  try {
    const response: AxiosResponse = yield call(apiTags.getTags);
    yield put(fetchTagsSuccess(response.data.tags));
  } catch (e) {}
}
function* handleAddComment(action: PayloadAction<CommentUpload>) {
  try {
    yield call(apiArticle.addCommentToArticle, action.payload);
    yield put(addCommentToArticleSuccess(action.payload.slug));
  } catch (e) {
    yield put(addCommentToArticlefailed("Comment failed"));
  }
}
function* handleDeleteComment(action: PayloadAction<{ slug: string; idComment: string }>) {
  try {
    yield call(apiArticle.deleteCommentInArticle, action.payload.slug, action.payload.idComment);
    yield put(addCommentToArticleSuccess(action.payload.slug));
  } catch (e) {
    yield put(addCommentToArticlefailed("Comment failed"));
  }
}
function* handleDeleteArticle(action: PayloadAction<DeleteArticle>) {
  try {
    action.payload.setDeleteLoading("pending");
    yield call(apiArticle.deleteArticle, action.payload.slug);
    action.payload.setDeleteLoading("success");
  } catch (e) {
    action.payload.setDeleteLoading("failed");
  }
}
function* handleAddCommentSuccess(action: PayloadAction<string>) {
  yield put(fetchComments(action.payload));
}
function* handleCreateArticle(action: PayloadAction<ArticleCreate>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.create, action.payload);
    yield Toast.fire({
      icon: "success",
      title: "Create Article successfully",
    });
    yield put(push(`/article/${response.data.article.slug}`));
  } catch (e: any) {
    const errors = Object.keys(e.response.data.errors);
    let content = "";
    errors.forEach((key: any) => {
      content += `<div>${key}: ${e.response.data.errors[key]}</div>`;
    });
    yield Toast.fire({
      icon: "error",
      title: content,
    });
  } finally {
    yield put(createArticleSuccess());
  }
}
function* handleEditArticle(action: PayloadAction<IArticle>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.updateArticle, action.payload.slug, {
      title: action.payload.title,
      description: action.payload.description,
      tagList: action.payload.tagList,
      body: action.payload.body,
    });
    yield Toast.fire({
      icon: "success",
      title: "Update Article successfully",
    });
    yield put(push(`/article/${response.data.article.slug}`));
  } catch (e: any) {
    yield Toast.fire({
      icon: "error",
      title: e.response.data.message,
    });
  } finally {
    yield put(createArticleSuccess());
  }
}
function* handleFavoriteArticle(action: PayloadAction<Favotite>) {
  try {
    switch (action.payload.type) {
      case "favorite":
        yield call(apiArticle.favoriteArticle, action.payload.slug);
        break;
      case "unfavorite":
        yield call(apiArticle.unFavoriteArticle, action.payload.slug);
        break;
    }
    action.payload.setSlugLoading("");
    action.payload.setLoadingFavorite(false);
    yield put(favoriteArticleSuccess(action.payload));
  } catch (e: any) {
    yield put(favoriteArticleFaild(action.payload));
  }
}
function* articleSaga() {
  yield takeLatest(fetchArticlesYouFeed.type, handleFetchArticlsFeed);
  yield takeLatest(fetchArticlesGlobal.type, handleFetchArticlsGlobal);
  yield takeLatest(fetchArticlesFavorite.type, handleFetchArticlsFavorite);
  yield takeLatest(deleteComment.type, handleDeleteComment);
  yield takeEvery(fetchComments.type, handleFetchComments);
  yield takeEvery(addCommentArticle.type, handleAddComment);
  yield takeEvery(addCommentToArticleSuccess.type, handleAddCommentSuccess);
  yield takeEvery(fetchTags.type, handleFetchTags);
  yield takeEvery(createArticle.type, handleCreateArticle);
  yield takeEvery(editArticle.type, handleEditArticle);
  yield takeEvery(favoriteArticle.type, handleFavoriteArticle);
  yield takeEvery(deleteArticle.type, handleDeleteArticle);
}
export default articleSaga;
