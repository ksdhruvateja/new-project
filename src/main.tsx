import { StrictMode, useEffect } from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { BulkQuoteProvider } from './context/BulkQuoteContext';
import './index.css';

const IMAGE_FALLBACK_URL = 'https://placehold.co/600x400?text=Product+Image+Coming+Soon';

function GlobalImageFallback() {
  useEffect(() => {
    const handleImageError = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (target.dataset.fallbackApplied === 'true') return;
      target.dataset.fallbackApplied = 'true';
      target.src = IMAGE_FALLBACK_URL;
    };

    // Capture-phase listener catches all image load failures in one place.
    document.addEventListener('error', handleImageError, true);
    return () => {
      document.removeEventListener('error', handleImageError, true);
    };
  }, []);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BulkQuoteProvider>
        <GlobalImageFallback />
        <App />
      </BulkQuoteProvider>
    </BrowserRouter>
  </StrictMode>,
);
