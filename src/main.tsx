import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.js"

createRoot(document.getElementById("root") || document.createElement("div")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
