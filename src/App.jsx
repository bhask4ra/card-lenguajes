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

  useEffect(() => {
    // Consumimos directamente la API con fetch
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
        console.warn('Uso de respaldo por desconexión:', err.message);
        setCharacters(FALLBACK_CHARACTERS);
        setLoading(false);
      });
  }, []);

  // Filtros dinámicos basados en los valores reales de 'status' de la API
  const estadosDisponibles = ['Todos', ...new Set(characters.map((c) => c.status))];

  const personajesFiltrados =
    statusActivo === 'Todos'
      ? characters
      : characters.filter((c) => c.status === statusActivo);

  return (
    <main>
      <header>
        <div className="badge-pill">Rick & Morty API</div>
        <h1>Directorio de Personajes</h1>
        <p className="subtitle">
          Consumo directo de API REST en React, validación con <strong>PropTypes</strong> y efectos visuales con <strong>CSS transform</strong>.
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
            /* Cada personaje se pasa directamente con los datos de la API */
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
