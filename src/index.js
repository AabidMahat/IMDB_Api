import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppV2 from "./Appv3";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppV2 />
    </BrowserRouter>
  </React.StrictMode>
);
