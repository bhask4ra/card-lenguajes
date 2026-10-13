import { FALLBACK_CHARACTERS } from '../data/fallbackData';

/**
 * URL de la API de Rick and Morty
 * API pública, rápida, sin autenticación ni problemas de certificados SSL.
 */
const API_URL = 'https://rickandmortyapi.com/api/character';

/**
 * Consulta los personajes desde la API
 * @returns {Promise<Array>} Lista de personajes sin transformar
 */
export async function getCharacters() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Respuesta HTTP no exitosa: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.warn('No se pudo conectar a la API remota, usando datos de respaldo:', error.message);
    // Devolvemos datos de respaldo para garantizar que el proyecto siempre funcione
    return FALLBACK_CHARACTERS;
  }
}
