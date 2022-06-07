import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import createSagaMiddleware from "redux-saga";
import aricleReducer from "../features/article/articleSlice";
import profileReducer from "../features/profile/profileSlice";
import userReducer from "../features/auth/authSlice";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});
export const store = configureStore({
  reducer: {
    user: userReducer,
    article: aricleReducer,
    profile: profileReducer,
    router: routerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});
sagaMiddleware.run(rootSaga);
export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
