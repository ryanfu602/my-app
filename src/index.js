import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import axios from "axios";
import {getApiUrl,redirect} from "./app/AppFunc"




axios.defaults.baseURL = getApiUrl();
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401 || error.response.status === 403) {
        redirect("/login");
      }
      return error;
    }
  );
  

ReactDOM.render(<App />, document.getElementById("index"));
