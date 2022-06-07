import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { login, loginFailed, loginSuccess, logout, register, registerSuccess } from "features/auth/authSlice";
import { push } from "redux-first-history";
import { call, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import { UserLogin, UserRegister } from "../../models/user.model";
import apiUsers from "../../services/user.service";
function* handleLogin(action: PayloadAction<UserLogin>) {
  try {
    const response: AxiosResponse = yield call(apiUsers.login, action.payload);
    localStorage.setItem("access_token", JSON.stringify(response.data.user));
    yield put(loginSuccess());
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

    yield Toast.fire({
      icon: "success",
      title: "Currently logged",
    });
    yield put(push("/"));
  } catch (error) {
    yield Swal.fire({
      title: "Error!",
      text: `Login failed`,
      icon: "error",
    });
    yield put(loginFailed());
  }
}
function* handleLogout() {
  yield localStorage.removeItem("access_token");
  yield put(push("/login"));
}
function* handleRegister(action: PayloadAction<UserRegister>) {
  try {
    yield apiUsers.register(action.payload);
    yield Swal.fire({
      title: "Success",
      text: `Register successfull!`,
      icon: "success",
    });
    yield put(login({ email: action.payload.email, password: action.payload.password }));
  } catch (e) {
    yield Swal.fire({
      title: "Error",
      text: `Register failed!`,
      icon: "error",
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
