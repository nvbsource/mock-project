import { AxiosResponse } from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import apiUsers from "../../services/user.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { login, loginFailed, loginSuccess, logout } from "features/auth/authSlice";
import { UserLogin } from "../../models/user.model";
function* handleLogin(action: PayloadAction<UserLogin>) {
  try {
    const response: AxiosResponse = yield call(apiUsers.login, action.payload);
    localStorage.setItem("access_token", response.data.user.token);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailed("Đăng nhập thất bại!"));
  }
}

function* userSaga() {
  yield takeEvery(login.type, handleLogin);
}
export default userSaga;
