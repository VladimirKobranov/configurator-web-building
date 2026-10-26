import { createRoot } from "react-dom/client";
import Configurator from "./Configurator";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Missing root element: expected an element with id "root".');
}

createRoot(rootElement).render(<Configurator />);
