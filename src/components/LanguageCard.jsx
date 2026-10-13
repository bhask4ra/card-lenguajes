import { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../styles/LanguageCard.css';

/**
 * Componente de tarjeta de personaje.
 * Consume directamente la estructura de la API, usando Fragments (<> ... </>)
 * exactamente como en el proyecto de ejemplo.
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
  const statusColors = {
    Alive: '#10b981', // Verde
    Dead: '#ef4444',  // Rojo
    unknown: '#9ca3af', // Gris
  };

  const cardColor = statusColors[status] || '#6366f1';
  const anio = created ? new Date(created).getFullYear() : 'Desconocido';

  return (
    <article className="card" style={{ '--card-color': cardColor }}>
      {/* Fragment para el encabezado con imagen y estado */}
      <>
        <div className="card__image-wrapper">
          <img src={image} alt={name} className="card__image" loading="lazy" />
          <span className="card__id-badge">ID #{id}</span>
          
          <span className="card__status-pill">
            <span className="card__status-dot"></span>
            {status}
          </span>
        </div>
      </>

      {/* Fragment para el cuerpo y los datos de la API */}
      <>
        <div className="card__body">
          <h2 className="card__title">{name}</h2>

          <div className="card__meta-tags">
            <span className="card__tag">{species}</span>
            <span className="card__tag">{gender}</span>
            {type && <span className="card__tag">{type}</span>}
          </div>

          <div className="card__details">
            <div className="card__detail-row">
              <span className="card__detail-label">Origen:</span>
              <span className="card__detail-val" title={origin?.name}>
                {origin?.name || 'Desconocido'}
              </span>
            </div>

            <div className="card__detail-row">
              <span className="card__detail-label">Ubicación:</span>
              <span className="card__detail-val" title={location?.name}>
                {location?.name || 'Desconocida'}
              </span>
            </div>

            <div className="card__detail-row">
              <span className="card__detail-label">Episodios:</span>
              <span className="card__detail-val">
                {episode?.length || 0} apariciones
              </span>
            </div>
          </div>
        </div>
      </>

      {/* Fragment para el pie de la tarjeta, idéntico al proyecto de ejemplo */}
      <>
        <footer className="card__footer">
          Creado en el {anio}
        </footer>
      </>
    </article>
  );
}

/**
 * VALIDACIÓN ESTRICTA CON PROPTYPES
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
