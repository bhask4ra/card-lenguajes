import PropTypes from 'prop-types';
import '../styles/LanguageCard.css';

/** 
 * Declaramos de qué tipo va a ser cada prop definido
 * @param {object} props
 * @param {string} props.nombre
 * @param {number} props.anio
 * @param {string} props.tipo
 * @param {string} props.descripcion
 * @param {string} props.emoji
 * @param {string} props.color
 * @param {string} [props.imagen]
 */
function LanguageCard({ nombre, anio, tipo, descripcion, emoji, color, imagen }) {
  return (
    <article className="card" style={{ '--card-color': color }}>
      {/** aqui va el encabezado */}
      <div className="card_header">
        {imagen ? (
          <img src={imagen} alt={nombre} className="card__image" />
        ) : (
          <span className="card_emoji">{emoji}</span>
        )}
        <h2 className="card_tittle">{nombre}</h2>
      </div>

      <span className="card_badge">{tipo}</span>

      <p className="card_description">{descripcion}</p>

      <footer className="card_footer">
        creado en el {anio}
      </footer>
    </article>
  );
}

LanguageCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  anio: PropTypes.number.isRequired,
  tipo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  imagen: PropTypes.string,
};

export default LanguageCard;
