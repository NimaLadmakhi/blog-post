import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/custom.css";
import { AppProvider } from "./context/provider";

ReactDOM.render(<AppProvider><App /></AppProvider>, document.getElementById('root'));