import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import history from "./history";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <React.Fragment>
    <Router history={history}>
      <App />
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);
