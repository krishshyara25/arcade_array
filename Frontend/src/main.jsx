import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import './index.css'
if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
