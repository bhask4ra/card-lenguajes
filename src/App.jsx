import { useState, useEffect } from 'react';
import LanguageCard from './components/LanguageCard';
import FilterBar from './components/FilterBar';
import { getCharacters } from './services/api';
import { transformCharacterList } from './utils/transform';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipoActivo, setTipoActivo] = useState('Todos');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // 1. Obtenemos datos de la API externa
        const rawData = await getCharacters();

        // 2. Transformamos los datos al formato requerido por LanguageCard (Data Transform)
        const transformedData = transformCharacterList(rawData);
        setItems(transformedData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Extraemos los tipos/estados únicos para la FilterBar
  const tiposDisponibles = ['Todos', ...new Set(items.map((item) => item.tipo))];

  // Filtramos la lista según el tipo activo seleccionado
  const itemsFiltrados =
    tipoActivo === 'Todos'
      ? items
      : items.filter((item) => item.tipo === tipoActivo);

  return (
    <main>
      <header>
        <h1>Tarjetas con Consumo de API</h1>
        <p className="subtitle">
          Consumiendo la API de Rick and Morty, implementando <strong>PropTypes</strong>,{' '}
          <strong>transformación de datos</strong> y efectos de <strong>CSS transform</strong> en hover.
        </p>
      </header>

      {/* Barra de Filtros con validación de PropTypes */}
      {items.length > 0 && (
        <FilterBar
          tipos={tiposDisponibles}
          tipoActivo={tipoActivo}
          onSeleccionar={setTipoActivo}
        />
      )}

      {/* Estado de Carga */}
      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Cargando datos desde la API...</p>
        </div>
      ) : (
        <section className="cards-grid">
          {itemsFiltrados.map((item) => (
            <LanguageCard
              key={item.id}
              nombre={item.nombre}
              anio={item.anio}
              tipo={item.tipo}
              descripcion={item.descripcion}
              emoji={item.emoji}
              color={item.color}
              imagen={item.imagen}
            />
          ))}
        </section>
      )}

      {!loading && itemsFiltrados.length === 0 && (
        <div className="empty-box">
          <p>No se encontraron tarjetas para el filtro seleccionado.</p>
        </div>
      )}
    </main>
  );
}

export default App;
