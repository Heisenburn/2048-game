import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Game from "./Components/Game/Game";
import "./styling.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Game />
  </StrictMode>
);
