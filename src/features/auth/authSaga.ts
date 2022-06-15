import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { login, loginSuccess, logout, register, registerSuccess } from "features/auth/authSlice";
import { toast } from "react-toastify";
import { push } from "redux-first-history";
import { call, put, takeEvery } from "redux-saga/effects";
import { UserLogin, UserRegister } from "../../models/user.model";
import apiUsers from "../../services/user.service";
import configAPI from "api/configApi";
function* handleLogin(action: PayloadAction<UserLogin>) {
  const toastId = toast.loading("Please wait...");
  try {
    const response: AxiosResponse = yield call(apiUsers.login, action.payload);
    localStorage.setItem("user_information", JSON.stringify(response.data.user));
    configAPI.defaults.headers.common["Authorization"] = `Bearer ${response.data.user.token}`;
    yield put(loginSuccess());
    yield toast.update(toastId, {
      render: "Log in successfull",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    yield put(push("/"));
  } catch (e: any) {
    const errors = Object.keys(e.response.data.errors);
    let content = "";
    errors.forEach((key: any) => {
      content += `${key}: ${e.response.data.errors[key]}`;
    });
    yield put(loginSuccess());
    yield toast.update(toastId, {
      render: content,
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  }
}
function* handleLogout() {
  yield localStorage.removeItem("user_information");
  yield (configAPI.defaults.headers.common["Authorization"] = "");
  yield put(push("/login"));
  yield toast("Logout success", { type: "success", autoClose: 1000 });
}
function* handleRegister(action: PayloadAction<UserRegister>) {
  const toastId = toast.loading("Please wait...");
  try {
    yield apiUsers.register(action.payload);
    yield toast.update(toastId, {
      render: "Register successfull",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    yield put(login({ email: action.payload.email, password: action.payload.password }));
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
    yield put(registerSuccess());
  }
}
function* userSaga() {
  yield takeEvery(login.type, handleLogin);
  yield takeEvery(logout.type, handleLogout);
  yield takeEvery(register.type, handleRegister);
}
export default userSaga;
