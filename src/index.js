import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <Context>
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);


