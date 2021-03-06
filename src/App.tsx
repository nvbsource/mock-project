import { Login, Register } from "pages/auth";
import FavoriteArticles from "pages/Favorite";
import Home from "pages/Home";
import Profile from "pages/Profile";
import Setting from "pages/Setting";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DefaultLayout, DefaultOnlyHeader, PrivateRoutes } from "./Layout";
import DetailArticle from "./pages/Article/pages/DetailArticle";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        }
      />
      <Route
        path="/login"
        element={
          <DefaultOnlyHeader>
            <Login />
          </DefaultOnlyHeader>
        }
      />
      <Route
        path="/register"
        element={
          <DefaultOnlyHeader>
            <Register />
          </DefaultOnlyHeader>
        }
      />
      <Route
        path="/profile/:slug"
        element={
          <DefaultLayout>
            <Profile />
          </DefaultLayout>
        }
      />
      <Route
        path="/setting"
        element={
          <PrivateRoutes>
            <DefaultLayout>
              <Setting />
            </DefaultLayout>
          </PrivateRoutes>
        }
      />
      <Route
        path="/favorite-articles"
        element={
          <PrivateRoutes>
            <DefaultLayout>
              <FavoriteArticles />
            </DefaultLayout>
          </PrivateRoutes>
        }
      />
      <Route
        path="/article/:slug"
        element={
          <DefaultLayout>
            <DetailArticle />
          </DefaultLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
