import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { UpdateInformationUser } from "models/user.model";
import { toast } from "react-toastify";
import { push } from "redux-first-history";
import { call, put, takeEvery } from "redux-saga/effects";
import apiProfile from "services/profile.service";
import apiUser from "services/user.service";
import {
  fetchProfile,
  fetchProfileSuccess,
  followProfile,
  followProfileFailed,
  followProfileSuccess,
  updateProfile,
  updateProfileSuccess,
} from "./profileSlice";

function* handleFetchProfile(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(apiProfile.getProfile, action.payload);
    yield put(fetchProfileSuccess(response.data.profile));
  } catch (e: any) {
    yield toast("Not found", { type: "warning", autoClose: 1000 });
    yield put(push("/"));
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
function* handleUpdateProfile(action: PayloadAction<UpdateInformationUser>) {
  const toastId = toast.loading("Please wait...");
  try {
    const response: AxiosResponse = yield call(apiUser.update, action.payload);
    yield toast.update(toastId, {
      render: "Edit Profile Successfull",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    localStorage.setItem("user_information", JSON.stringify(response.data.user));
  } catch (e: any) {
    yield toast.update(toastId, {
      render: e.response.data,
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  } finally {
    yield put(updateProfileSuccess());
  }
}
function* profileSaga() {
  yield takeEvery(fetchProfile.type, handleFetchProfile);
  yield takeEvery(followProfile.type, handleFollow);
  yield takeEvery(updateProfile.type, handleUpdateProfile);
}
export default profileSaga;
