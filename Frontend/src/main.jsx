import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
// import './index.css'
if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}


ReactDOM.createRoot(document.getElementById("root")).render(

<Auth0Provider
  domain="dev-i10bvs6vb7rlrzib.us.auth0.com"
  clientId="MOfNJ3UEbiRUo6k9YuRxEwzbM5E94olu"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <BrowserRouter>
  <App />
</BrowserRouter>
</Auth0Provider>

);