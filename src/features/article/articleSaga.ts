import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import apiArticles from "../../services/articles.service";
import { getListArticles, getListArticlesFailed, getListArticlesSuccess } from "./articleSlice";
function* handleGetListArticles() {
  try {
    const response: AxiosResponse = yield call(apiArticles.getListArticles);
    yield put(getListArticlesSuccess(response.data.articles));
  } catch (error) {
    yield put(getListArticlesFailed("Lấy dữ liệu thất bại"));
  }
}

function* articleSaga() {
  yield takeEvery(getListArticles.type, handleGetListArticles);
}
export default articleSaga;
