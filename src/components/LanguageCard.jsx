import PropTypes from 'prop-types';
import '../styles/LanguageCard.css';

/**
 * Componente que muestra la tarjeta consumiendo directamente las propiedades
 * devueltas por la API de Rick and Morty.
 * 
 * @param {object} props - Propiedades recibidas de la API
 * @param {number} props.id - ID único del personaje
 * @param {string} props.name - Nombre del personaje
 * @param {string} props.status - Estado ('Alive', 'Dead', 'unknown')
 * @param {string} props.species - Especie ('Human', 'Alien', etc.)
 * @param {string} [props.type] - Subtipo o variante
 * @param {string} props.gender - Género ('Male', 'Female', etc.)
 * @param {object} props.origin - Objeto con datos de origen
 * @param {object} [props.location] - Objeto con la ubicación actual
 * @param {string} props.image - URL de la imagen del avatar
 * @param {string[]} [props.episode] - Array de URLs de episodios
 * @param {string} props.created - Fecha ISO de creación
 */
function CharacterCard({
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
  // Asignamos un color según el status que responde la API
  const colorMap = {
    Alive: '#10b981', // Verde esmeralda
    Dead: '#ef4444',  // Rojo
    unknown: '#6b7280', // Gris
  };
  const cardColor = colorMap[status] || '#6366f1';

  // Obtenemos el año formateado a partir del campo 'created' de la API
  const anio = created ? new Date(created).getFullYear() : 'Desconocido';

  return (
    <article className="card" style={{ '--card-color': cardColor }}>
      {/* Encabezado con imagen/avatar y nombre devueltos por la API */}
      <div className="card_header">
        <img src={image} alt={name} className="card__image" loading="lazy" />
        <div className="card__title-container">
          <h2 className="card_tittle">{name}</h2>
          <span className="card__id">#{id}</span>
        </div>
      </div>

      {/* Badge con el 'status' exacto de la API */}
      <span className="card_badge">{status}</span>

      {/* Descripción construida con los campos de la API */}
      <div className="card_description">
        <p><strong>Especie:</strong> {species} {type ? `(${type})` : ''}</p>
        <p><strong>Género:</strong> {gender}</p>
        <p><strong>Origen:</strong> {origin?.name || 'Desconocido'}</p>
        {location?.name && <p><strong>Ubicación:</strong> {location.name}</p>}
        <p><strong>Episodios:</strong> {episode?.length || 0}</p>
      </div>

      {/* Pie con el año extraído del campo 'created' */}
      <footer className="card_footer">
        Creado en el {anio}
      </footer>
    </article>
  );
}

/**
 * PROPTYPES ADAPTADOS A LA RESPUESTA REAL DE LA API
 * 
 * Aquí validamos cada uno de los tipos de datos que la API entrega:
 * - id: number
 * - name: string
 * - status: string (específicamente 'Alive', 'Dead' o 'unknown')
 * - species: string
 * - gender: string
 * - image: string (URL)
 * - origin: objeto con name y url
 * - location: objeto con name y url
 * - episode: array de strings
 * - created: string en formato ISO
 */
CharacterCard.propTypes = {
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

// Exportamos también como LanguageCard para mantener compatibilidad
export const LanguageCard = CharacterCard;
export default CharacterCard;
