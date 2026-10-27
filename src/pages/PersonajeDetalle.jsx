import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LanguageCard from '../components/LanguageCard'

const statusColors = {
  Alive: '#10b981',
  Dead: '#ef4444',
  unknown: '#9ca3af',
}

const statusEmojis = {
  Alive: '🟢',
  Dead: '💀',
  unknown: '❓',
}

export default function PersonajeDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCharacter() {
      setLoading(true)
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
          { signal: controller.signal }
        )
        if (response.ok) {
          const data = await response.json()
          setCharacter(data)
        }
      } catch {
        // Ignorar errores o abortos para mantener la vista funcional sin conexión
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCharacter()
    return () => controller.abort()
  }, [id])

  return (
    <>
      <h1>Personaje con id #{id}</h1>
      {loading && <p>Cargando detalle...</p>}
      {character && (
        <div style={{ maxWidth: '400px', margin: '1rem auto' }}>
          <LanguageCard
            nombre={character.name}
            anio={new Date(character.created).getFullYear()}
            tipo={character.status}
            descripcion={`${character.species} • ${character.gender} • Origen: ${character.origin?.name ?? 'Desconocido'} • Ubicación: ${character.location?.name ?? 'Desconocida'}`}
            emoji={statusEmojis[character.status] ?? '❓'}
            color={statusColors[character.status] ?? '#6366f1'}
          />
        </div>
      )}
      <div>
        <button onClick={() => navigate(-1)}>Regresar a la lista</button>
      </div>
    </>
  )
}
