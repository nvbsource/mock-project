import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { fetchTags } from "features/tag/tagSlice";
import { toast } from "react-toastify";
import { push } from "redux-first-history";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
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
  fetchArticlesByTag,
  fetchArticlesByTagFailed,
  fetchArticlesByTagSuccess,
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
  fetchTotalArticlesGlobal,
  fetchTotalArticlesYouFeed,
  setTotalArticle,
} from "./articleSlice";
function* handleFetchArticlsGlobalFilter(action: PayloadAction<{ limit: number; offset: number }>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getListArticles, action.payload);
    yield put(fetchArticlesGlobalSuccess(response.data.articles));
  } catch (e) {
    yield put(fetchArticlesGlobalFailed("Get data failed"));
  }
}
function* handleFetchArticlsByTag(action: PayloadAction<{ limit: number; offset: number; tag: string }>) {
  try {
    const response: AxiosResponse[] = yield all([
      call(apiArticle.getListArticlesByTag, action.payload),
      call(apiArticle.getTotalArticlesByTag, { tag: action.payload.tag }),
    ]);
    const [list, total] = response;
    yield put(fetchArticlesByTagSuccess(list.data.articles));
    yield put(setTotalArticle(total.data.articlesCount));
  } catch (e) {
    yield put(fetchArticlesByTagFailed("Get data failed"));
  }
}
function* handleFetchArticlsFeedFilter(action: PayloadAction<{ limit: number; offset: number }>) {
  try {
    const response: AxiosResponse = yield call(apiArticle.getListArticlesFeed, action.payload);
    yield put(fetchArticlesYouFeedSuccess(response.data.articles));
  } catch (e) {
    yield put(fetchArticlesYouFeedFailed("Get data failed"));
  }
}
function* handleFetchTotalArticlsFeed() {
  try {
    const response: AxiosResponse = yield call(apiArticle.getTotalArticlesFeed);
    yield put(setTotalArticle(response.data.articlesCount));
  } catch (e) {
    yield put(fetchArticlesYouFeedFailed("Get data failed"));
  }
}
function* handleFetchTotalArticlsGlobal() {
  try {
    const response: AxiosResponse = yield call(apiArticle.getTotalArticles);
    yield put(setTotalArticle(response.data.articlesCount));
  } catch (e) {
    yield put(fetchArticlesGlobalFailed("Get data failed"));
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
    yield action.payload.setDeleteLoading("pending");
    yield call(apiArticle.deleteArticle, action.payload.slug);
    yield put(fetchTags());
    yield action.payload.setDeleteLoading("success");
    yield toast("Delete article successfull", {
      type: "success",
      autoClose: 1000,
    });
    yield put(push("/"));
  } catch (e) {
    action.payload.setDeleteLoading("failed");
    yield toast("Delete article failed", {
      type: "error",
      autoClose: 1000,
    });
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
    yield put(fetchTags());
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
    yield action.payload.setSlugLoading("");
    yield action.payload.setLoadingFavorite(false);
  }
}

function* articleSaga() {
  yield takeLatest(fetchTotalArticlesGlobal.type, handleFetchTotalArticlsGlobal);
  yield takeLatest(fetchTotalArticlesYouFeed.type, handleFetchTotalArticlsFeed);
  yield takeLatest(fetchArticlesYouFeed.type, handleFetchArticlsFeedFilter);
  yield takeLatest(fetchArticlesGlobal.type, handleFetchArticlsGlobalFilter);
  yield takeEvery(createArticle.type, handleCreateArticle);
  yield takeEvery(editArticle.type, handleEditArticle);
  yield takeEvery(favoriteArticle.type, handleFavoriteArticle);
  yield takeEvery(deleteArticle.type, handleDeleteArticle);
  yield takeLatest(fetchArticlesByAuthor.type, handleFetchArticlsByAuthor);
  yield takeLatest(fetchArticlesFavoriteByAuthor.type, handleFetchArticlsFavoriteByAuthor);
  yield takeLatest(fetchDetailArticle.type, handleFetchDetailArticle);
  yield takeLatest(fetchArticlesByTag.type, handleFetchArticlsByTag);
}
export default articleSaga;
