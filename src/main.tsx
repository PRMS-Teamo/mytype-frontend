import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';


async function prepare() {
  // if (import.meta.env.MODE === 'development') {
  //   const { worker } = await import('./mock/browser');
  //   await worker.start();
  // }

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

prepare();