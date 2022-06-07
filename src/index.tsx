import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import App from "./App";
import { history, store } from "./app/store";
import GlobalStyles from "./components/GlobalStyles/index";
import "./index.scss";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Router history={history}>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </Router>
);
