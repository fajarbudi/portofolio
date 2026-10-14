import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Dipakai saat build untuk prerender HTML statis (SEO)
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
