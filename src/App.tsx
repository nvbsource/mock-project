import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./components/Layout";
import { publicRoutes } from "./router";
function App() {
  return (
    <Routes>
      {publicRoutes.map((item, index) => {
        let Layout: React.ComponentState = DefaultLayout;
        if (item.layout) {
          Layout = item.layout;
        } else if (item.layout === null) {
          Layout = Fragment;
        }
        const Page = item.component;
        return (
          <Route
            key={index}
            path={item.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
