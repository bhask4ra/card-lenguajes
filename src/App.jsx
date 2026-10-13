import { useState, useEffect } from 'react';
import LanguageCard from './components/LanguageCard';
import FilterBar from './components/FilterBar';
import { FALLBACK_CHARACTERS } from './data/fallbackData';
import './App.css';

const API_URL = 'https://rickandmortyapi.com/api/character';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusActivo, setStatusActivo] = useState('Todos');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // 1. Detección de conectividad online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 2. Soporte para instalación de PWA (botón Instalar)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 3. Carga de datos de la API (con soporte de Service Worker / Fallback)
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Conexión remota no disponible, usando respaldo offline:', err.message);
        setCharacters(FALLBACK_CHARACTERS);
        setLoading(false);
      });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

  // Filtros dinámicos basados en los valores reales de 'status' de la API
  const estadosDisponibles = ['Todos', ...new Set(characters.map((c) => c.status))];

  const personajesFiltrados =
    statusActivo === 'Todos'
      ? characters
      : characters.filter((c) => c.status === statusActivo);

  return (
    <main>
      <header>
        <div className="header-top-bar">
          <span className="badge-pill">Rick & Morty PWA</span>
          
          {/* Indicador de estado de conexión */}
          <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            <span className="indicator-dot"></span>
            {isOnline ? 'En línea' : 'Modo Offline (Caché)'}
          </span>

          {/* Botón de instalación PWA cuando el navegador lo permite */}
          {canInstall && (
            <button type="button" className="install-pwa-btn" onClick={handleInstallClick}>
              Instalar App
            </button>
          )}
        </div>

        <h1>Directorio de Personajes</h1>
        <p className="subtitle">
          PWA instalable con soporte sin conexión, consumo de API, validación estricta con <strong>PropTypes</strong> y efectos interactivos con <strong>CSS transform</strong>.
        </p>
      </header>

      {/* Barra de Filtros interactiva */}
      {characters.length > 0 && (
        <FilterBar
          tipos={estadosDisponibles}
          tipoActivo={statusActivo}
          onSeleccionar={setStatusActivo}
        />
      )}

      {/* Indicador de carga */}
      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Cargando personajes desde la API...</p>
        </div>
      ) : (
        <section className="cards-grid">
          {personajesFiltrados.map((character) => (
            <LanguageCard
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              species={character.species}
              type={character.type}
              gender={character.gender}
              origin={character.origin}
              location={character.location}
              image={character.image}
              episode={character.episode}
              created={character.created}
            />
          ))}
        </section>
      )}

      {!loading && personajesFiltrados.length === 0 && (
        <div className="empty-box">
          <p>No se encontraron personajes para el filtro seleccionado.</p>
        </div>
      )}
    </main>
  );
}

export default App;
