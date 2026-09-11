import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./declarative/nav2/NavBar.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>,
);
