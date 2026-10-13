import PropTypes from 'prop-types';
import '../styles/LanguageCard.css';

/**
 * Componente de tarjeta de personaje.
 * Consume directamente la estructura que responde la API de Rick and Morty
 * y valida cada dato con PropTypes.
 */
function LanguageCard({
  id,
  name,
  status,
  species,
  type,
  gender,
  origin,
  location,
  image,
  episode,
  created,
}) {
  // Configuración visual según el estado que devuelve la API
  const statusConfig = {
    Alive: { color: '#10b981', label: 'Vivo', dot: '🟢' },
    Dead: { color: '#ef4444', label: 'Muerto', dot: '🔴' },
    unknown: { color: '#9ca3af', label: 'Desconocido', dot: '⚪' },
  };

  const currentStatus = statusConfig[status] || statusConfig.unknown;
  const anio = created ? new Date(created).getFullYear() : 'Desconocido';

  return (
    <article className="card" style={{ '--card-color': currentStatus.color }}>
      {/* Contenedor de la imagen con efecto CSS transform al hover */}
      <div className="card__image-wrapper">
        <img src={image} alt={name} className="card__image" loading="lazy" />
        <span className="card__id-badge">#{id}</span>
        <span className="card__status-pill">
          <span className="card__status-dot">{currentStatus.dot}</span>
          {status}
        </span>
      </div>

      {/* Contenido principal de la tarjeta */}
      <div className="card__body">
        <h2 className="card__title">{name}</h2>

        <div className="card__meta-tags">
          <span className="card__tag">🧬 {species}</span>
          <span className="card__tag">⚧️ {gender}</span>
          {type && <span className="card__tag">✨ {type}</span>}
        </div>

        {/* Detalles directos de la API */}
        <div className="card__details">
          <div className="card__detail-row">
            <span className="card__detail-label">🌍 Origen:</span>
            <span className="card__detail-val" title={origin?.name}>
              {origin?.name || 'Desconocido'}
            </span>
          </div>

          <div className="card__detail-row">
            <span className="card__detail-label">📍 Ubicación:</span>
            <span className="card__detail-val" title={location?.name}>
              {location?.name || 'Desconocida'}
            </span>
          </div>

          <div className="card__detail-row">
            <span className="card__detail-label">🎬 Episodios:</span>
            <span className="card__detail-val">
              {episode?.length || 0} apariciones
            </span>
          </div>
        </div>
      </div>

      {/* Pie de tarjeta con año extraído del campo created */}
      <footer className="card__footer">
        📅 Creado en el {anio}
      </footer>
    </article>
  );
}

/**
 * VALIDACIÓN ESTRICTA CON PROPTYPES
 * Valida directamente los campos tal como los devuelve la API
 */
LanguageCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Alive', 'Dead', 'unknown']).isRequired,
  species: PropTypes.string.isRequired,
  type: PropTypes.string,
  gender: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  origin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  episode: PropTypes.arrayOf(PropTypes.string),
  created: PropTypes.string.isRequired,
};

export const CharacterCard = LanguageCard;
export default LanguageCard;
