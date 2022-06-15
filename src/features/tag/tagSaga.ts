import { call, put, takeLatest } from "redux-saga/effects";
import { fetchTags, fetchTagFailed, fetchTagSuccess } from "./tagSlice";
import { AxiosResponse } from "axios";
import apiTags from "services/tags.service";
function* handleFetchTags() {
  try {
    const response: AxiosResponse = yield call(apiTags.getTags);
    yield put(fetchTagSuccess(response.data.tags));
  } catch (error) {
    yield put(fetchTagFailed());
  }
}
export default function* tagSaga() {
  yield takeLatest(fetchTags.type, handleFetchTags);
}
