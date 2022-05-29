import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice";
import articleReducer from "../features/article/articleSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
