/**
 * TRANSFORMADOR DE DATOS (Data Transform)
 * 
 * Transforma la respuesta cruda de la API (Rick and Morty)
 * al modelo exacto que requiere el componente LanguageCard con sus PropTypes:
 * 
 * - nombre: string
 * - anio: number
 * - tipo: string
 * - descripcion: string
 * - emoji: string
 * - color: string
 * - imagen: string (opcional)
 */

/**
 * Transforma un personaje individual obtenido de la API
 * @param {object} item - Objeto crudo de la API
 * @returns {object} - Objeto adaptado para LanguageCard
 */
export function transformCharacter(item) {
  // Determinamos color y emoji en función del estado (status)
  let color = '#9ca3af'; // Gris (unknown u otro)
  let emoji = '❓';

  if (item.status === 'Alive') {
    color = '#10b981'; // Verde esmeralda para vivos
    emoji = '🟢';
  } else if (item.status === 'Dead') {
    color = '#ef4444'; // Rojo para fallecidos
    emoji = '💀';
  }

  // Extraer año de creación (ej. de "2017-11-04T18:48:46.250Z") o fallback
  let anio = 2017;
  if (item.created) {
    const parsedYear = new Date(item.created).getFullYear();
    if (!Number.isNaN(parsedYear)) {
      anio = parsedYear;
    }
  }

  const origen = item.origin && item.origin.name ? item.origin.name : 'Desconocido';
  const episodios = Array.isArray(item.episode) ? item.episode.length : 0;

  return {
    id: item.id,
    nombre: item.name || 'Sin nombre',
    anio: anio,
    tipo: item.status || 'Desconocido',
    descripcion: `Especie: ${item.species || 'N/A'} • Género: ${item.gender || 'N/A'} • Origen: ${origen} (${episodios} episodios)`,
    emoji: emoji,
    color: color,
    imagen: item.image || '',
  };
}

/**
 * Transforma una lista completa de personajes proveniente de la API
 * @param {Array} list - Lista cruda de la API
 * @returns {Array} - Lista transformada para los componentes
 */
export function transformCharacterList(list = []) {
  if (!Array.isArray(list)) return [];
  return list.map(transformCharacter);
}
