import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root') as HTMLElement;
const data = (window as any).__PRERENDER_DATA__ ?? {};
const app = (
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>
);

// Pre-rendered pages already contain the page's HTML; attach to it instead of starting over.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
