import { all } from "redux-saga/effects";
import userSaga from "../features/auth/authSaga";
import articleSaga from "../features/article/articleSaga";
export default function* rootSaga() {
  yield all([userSaga(), articleSaga()]);
}
