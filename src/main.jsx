import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
import { registerSW } from 'virtual:pwa-register';

// Registra el Service Worker de la PWA de forma inmediata
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('Nueva versión disponible para la PWA.');
  },
  onOfflineReady() {
    console.log('PWA lista para funcionar sin conexión.');
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
