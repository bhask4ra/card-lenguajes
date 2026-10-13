import PropTypes from 'prop-types';
import '../styles/FilterBar.css';

/**
 * Componente FilterBar para filtrar tarjetas por categoría.
 * Utiliza Fragments (<> ... </>) idéntico a la estructura del proyecto de ejemplo.
 */
function FilterBar({ tipos, tipoActivo, onSeleccionar }) {
  return (
    <>
      <nav className="filter-bar" aria-label="Filtro de tarjetas">
        {tipos.map((tipo) => (
          <button
            key={tipo}
            type="button"
            className={`filter-btn ${tipoActivo === tipo ? 'active' : ''}`}
            onClick={() => onSeleccionar(tipo)}
          >
            {tipo}
          </button>
        ))}
      </nav>
    </>
  );
}

/**
 * Estructura proptypes
 * nombre componente/ funcion, .propTypes, contenido
 */
FilterBar.propTypes = {
  tipos: PropTypes.arrayOf(PropTypes.string).isRequired,
  tipoActivo: PropTypes.string.isRequired,
  onSeleccionar: PropTypes.func.isRequired,
};

export default FilterBar;
