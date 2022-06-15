import { all } from "redux-saga/effects";
import userSaga from "../features/auth/authSaga";
import articleSaga from "../features/article/articleSaga";
import profileSaga from "features/profile/profileSaga";
import commentSaga from "../features/comment/commentSaga";
import tagSaga from "features/tag/tagSaga";
export default function* rootSaga() {
  yield all([userSaga(), articleSaga(), profileSaga(), commentSaga(), tagSaga()]);
}
