import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { push } from "redux-first-history";
import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import apiArticle from "services/articles.service";
import { ArticleCreate, IArticle } from "../../models/article.model";
import {
  createArticle,
  createArticleSuccess,
  DeleteArticle,
  deleteArticle,
  editArticle,
  editArticleFailed,
  editArticleSuccess,
  favoriteArticle,
  favoriteArticleFaild,
  favoriteArticleSuccess,
  Favotite,
  fetchArticlesByAuthor,
  fetchArticlesByAuthorSuccess,
  fetchArticlesFavoriteByAuthor,
  fetchArticlesFavoriteByAuthorFailed,
  fetchArticlesFavoriteByAuthorSuccess,
  fetchArticlesGlobal,
  fetchArticlesGlobalFailed,
  fetchArticlesGlobalSuccess,
  fetchArticlesYouFeed,
  fetchArticlesYouFeedFailed,
  fetchArticlesYouFeedSuccess,
  fetchDetailArticle,
  fetchDetailArticleFailed,
  fetchDetailArticleSuccess,
  setTotalArticleGlobal,
  setTotalArticleYouFeed,
} from "./articleSlice";
function* handleFetchArticlsGlobal(action: PayloadAction<{ limit: number; offset: number }>) {
  try {
    const response: AxiosResponse[] = yield all([
      call(apiArticle.getListArticles, action.payload),
      call(apiArticle.getTotalArticles),
    ]);
    const [list, total] = response;
    yield put(fetchArticlesGlobalSuccess(list.data.articles));
    yield put(setTotalArticleGlobal(total.data.articlesCount));
  } catch (e) {
    yield put(fetchArticlesGlobalFailed("Get data failed"));
  }
}
function* handleFetchArticlsFeed(action: PayloadAction<{ limit: number; offset: number }>) {
  try {
    const response: AxiosResponse[] = yield all([
      call(apiArticle.getListArticlesFeed, action.payload),
      call(apiArticle.getTotalArticlesFeed),
    ]);
    const [list, total] = response;
    yield put(fetchArticlesYouFeedSuccess(list.data.articles));
    yield put(setTotalArticleYouFeed(total.data.articlesCount));
  } catch (e) {
    yield put(fetchArticlesYouFeedFailed("Get data failed"));
  }
}
function* handleFetchDetailArticle(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getArticle, action.payload);
    yield put(fetchDetailArticleSuccess(response.data.article));
  } catch (e) {
    toast("Not found", {
      type: "warning",
      autoClose: 1000,
    });
    yield put(push("/"));
    yield put(fetchDetailArticleFailed("Get data failed"));
  }
}
function* handleFetchArticlsByAuthor(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getListArticlesFilter, { author: action.payload });
    yield put(fetchArticlesByAuthorSuccess(response.data.articles));
  } catch (e) {}
}
function* handleFetchArticlsFavoriteByAuthor(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getListArticlesFavorite, { author: action.payload });
    yield put(fetchArticlesFavoriteByAuthorSuccess(response.data.articles));
  } catch (e) {
    yield put(fetchArticlesFavoriteByAuthorFailed());
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
function* handleCreateArticle(action: PayloadAction<ArticleCreate>) {
  const toastId = toast.loading("Please wait...");
  try {
    const response: AxiosResponse = yield call(apiArticle.create, action.payload);
    yield toast.update(toastId, {
      render: "Created Article Successfull",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    yield put(push(`/article/${response.data.article.slug}`));
  } catch (e: any) {
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
  } finally {
    yield put(createArticleSuccess());
  }
}
function* handleEditArticle(action: PayloadAction<IArticle>) {
  const toastId = toast.loading("Please wait...");
  try {
    const response: AxiosResponse = yield call(apiArticle.updateArticle, action.payload.slug, {
      title: action.payload.title,
      description: action.payload.description,
      tagList: action.payload.tagList,
      body: action.payload.body,
    });
    yield toast.update(toastId, {
      render: "Edit Article Successfull",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    yield put(editArticleSuccess());
    yield put(fetchDetailArticleSuccess(response.data.article));
    yield put(push(`/article/${response.data.article.slug}`));
  } catch (e: any) {
    yield put(editArticleFailed());
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
    yield put(favoriteArticleSuccess(action.payload));
    yield toast(`${action.payload.type} successfull`, {
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
  } catch (e: any) {
    yield put(favoriteArticleFaild(action.payload));
    yield toast(`${action.payload.type} failed`, {
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  } finally {
    action.payload.setSlugLoading("");
    action.payload.setLoadingFavorite(false);
  }
}

function* articleSaga() {
  yield takeLatest(fetchArticlesYouFeed.type, handleFetchArticlsFeed);
  yield takeLatest(fetchArticlesGlobal.type, handleFetchArticlsGlobal);
  yield takeEvery(createArticle.type, handleCreateArticle);
  yield takeEvery(editArticle.type, handleEditArticle);
  yield takeEvery(favoriteArticle.type, handleFavoriteArticle);
  yield takeEvery(deleteArticle.type, handleDeleteArticle);
  yield takeLatest(fetchArticlesByAuthor.type, handleFetchArticlsByAuthor);
  yield takeLatest(fetchArticlesFavoriteByAuthor.type, handleFetchArticlsFavoriteByAuthor);
  yield takeLatest(fetchDetailArticle.type, handleFetchDetailArticle);
}
export default articleSaga;
