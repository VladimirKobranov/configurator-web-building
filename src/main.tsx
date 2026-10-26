import { createRoot } from "react-dom/client";
import Configurator from "./app/Configurator";
import "./styles/globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Missing root element: expected an element with id "root".');
}

createRoot(rootElement).render(<Configurator />);
