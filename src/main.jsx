import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ChakraInit from "./ChakraInit";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <ChakraInit>
    <App />
  </ChakraInit>,
);
