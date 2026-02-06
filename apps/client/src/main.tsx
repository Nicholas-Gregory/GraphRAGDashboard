import { createRoot } from 'react-dom/client';
import { App } from './App';
import * as React from 'react';

new EventSource('/esbuild').addEventListener('change', () => location.reload());

const root = createRoot(document.getElementById('app')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);