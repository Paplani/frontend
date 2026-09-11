import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainTask from "./components/MainTask.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainTask />
  </StrictMode>,
);
