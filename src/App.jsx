import { useState, useEffect, Fragment } from 'react';
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
    // Carga directa de la API (con soporte de Service Worker PWA / Fallback)
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
  }, []);

  // Filtros dinámicos basados en los valores reales de 'status' de la API
  const estadosDisponibles = ['Todos', ...new Set(characters.map((c) => c.status))];

  const personajesFiltrados =
    statusActivo === 'Todos'
      ? characters
      : characters.filter((c) => c.status === statusActivo);

  return (
    /* Fragment (<> ... </>) envolviendo el retorno principal idéntico a card-lenguajes */
    <>
      <main>
        <header>
          <h1>Directorio de Personajes</h1>
        </header>

        {/* Barra de Filtros interactiva con Fragment */}
        {characters.length > 0 && (
          <FilterBar
            tipos={estadosDisponibles}
            tipoActivo={statusActivo}
            onSeleccionar={setStatusActivo}
          />
        )}

        {/* Feedback condicional con Fragments */}
        {loading ? (
          <>
            <div className="loading-box">
              <div className="spinner"></div>
              <p>Cargando personajes desde la API...</p>
            </div>
          </>
        ) : (
          <section className="cards-grid">
            {personajesFiltrados.map((character) => (
              /* Usando Fragment con key para renderizar cada tarjeta */
              <Fragment key={character.id}>
                <LanguageCard
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
              </Fragment>
            ))}
          </section>
        )}

        {!loading && personajesFiltrados.length === 0 && (
          <>
            <div className="empty-box">
              <p>No se encontraron personajes para el filtro seleccionado.</p>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
