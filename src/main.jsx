import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Hasil build sudah berisi HTML prerender -> hydrate; saat dev -> render biasa
if (container.hasAttribute("data-ssr")) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// Analytics dirender terpisah agar tidak memengaruhi hydration
createRoot(document.createElement("div")).render(<Analytics />);
