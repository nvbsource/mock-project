import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { fetchArticlesFavoriteSuccess } from "features/article/articleSlice";
import { all, call, put, takeEvery } from "redux-saga/effects";
import apiArticle from "services/articles.service";
import apiProfile from "services/profile.service";
import Swal from "sweetalert2";
import {
  fetchProfile,
  fetchProfileSuccess,
  followProfile,
  followProfileFailed,
  followProfileSuccess,
} from "./profileSlice";

function* handleFetchProfile(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse[] = yield all([
      call(apiProfile.getProfile, action.payload),
      call(apiArticle.getListArticlesFilter, { author: action.payload }),
    ]);
    const [profile, articles] = response;
    yield put(fetchProfileSuccess(profile.data.profile));
    yield put(fetchArticlesFavoriteSuccess(articles.data.articles));
  } catch (e) {
    yield Swal.fire({
      title: "Error",
      text: `Get Profile failed!`,
      icon: "error",
    });
  }
}
function* handleFollow(action: PayloadAction<{ username: string; type: "follow" | "unfollow" }>) {
  try {
    switch (action.payload.type) {
      case "follow":
        yield call(apiProfile.followUser, action.payload.username);
        break;
      case "unfollow":
        yield call(apiProfile.unFollowUser, action.payload.username);
        break;
    }
    yield put(followProfileSuccess(action.payload.type));
  } catch (e: any) {
    yield put(followProfileFailed());
  }
}
function* profileSaga() {
  yield takeEvery(fetchProfile.type, handleFetchProfile);
  yield takeEvery(followProfile.type, handleFollow);
}
export default profileSaga;
