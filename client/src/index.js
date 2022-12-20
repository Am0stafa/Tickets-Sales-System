import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
 
const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);