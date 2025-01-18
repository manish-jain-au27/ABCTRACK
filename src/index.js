import React from "react";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "./assets/assets/scss/main.scss";
import "./assets/assets/scss/color_skins.scss";
import "../node_modules/font-awesome/css/font-awesome.min.css";

const store = configureStore({ reducer: reducers, middleware: () => { return [thunk] } });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
