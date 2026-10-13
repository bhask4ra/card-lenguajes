import { useState, useEffect } from 'react';
import CharacterCard from './components/LanguageCard';
import FilterBar from './components/FilterBar';
import { getCharacters } from './services/api';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusActivo, setStatusActivo] = useState('Todos');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Obtenemos los personajes directamente de la API de Rick and Morty
        const data = await getCharacters();
        setCharacters(data);
      } catch (error) {
        console.error('Error al consultar la API:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Obtenemos los estados únicos de los personajes devueltos por la API para los filtros
  const estadosDisponibles = ['Todos', ...new Set(characters.map((c) => c.status))];

  // Filtramos la lista según el estado seleccionado en FilterBar
  const personajesFiltrados =
    statusActivo === 'Todos'
      ? characters
      : characters.filter((c) => c.status === statusActivo);

  return (
    <main>
      <header>
        <h1>Consumo de API - Rick and Morty</h1>
        <p className="subtitle">
          Tarjetas con validación estricta de <strong>PropTypes</strong> reflejando los campos directos de la API,
          con efectos interactivos mediante <strong>CSS transform</strong> y filtros reactivos.
        </p>
      </header>

      {/* Barra de filtros */}
      {characters.length > 0 && (
        <FilterBar
          tipos={estadosDisponibles}
          tipoActivo={statusActivo}
          onSeleccionar={setStatusActivo}
        />
      )}

      {/* Feedback de carga */}
      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Consultando la API...</p>
        </div>
      ) : (
        <section className="cards-grid">
          {personajesFiltrados.map((character) => (
            /* Pasamos directamente las propiedades de la API, validadas con PropTypes */
            <CharacterCard
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
