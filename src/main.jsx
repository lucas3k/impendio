import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import { toastifyContainerStyle } from "./shared/components/Notification";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <CssBaseline />
        <App />
        <ToastContainer {...toastifyContainerStyle} />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
