import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LanguageCard from '../components/LanguageCard'
import Pagination from '../components/Pagination'
import { useCharacteres } from '../useCharacteres'

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

export default function Personajes() {
  const [page, setPage] = useState(
    () => Number(localStorage.getItem('rm_page')) || 1
  )
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('rm_page', String(page))
  }, [page])

  const { characters, totalPages, loading, error } = useCharacteres(page)

  return (
    <main className="app">
      <h1>Rick and Morty</h1>
      {loading && <p>Cargando ....</p>}
      {error && <p role="alert"> ocurrio un error {error}</p>}

      <section className="cards-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-item">
            <LanguageCard
              nombre={character.name}
              anio={new Date(character.created).getFullYear()}
              tipo={character.status}
              descripcion={`${character.species} • ${character.gender} • Origen: ${character.origin?.name ?? 'Desconocido'}`}
              emoji={statusEmojis[character.status] ?? '❓'}
              color={statusColors[character.status] ?? '#6366f1'}
            />
            <div className="character-actions">
              <button onClick={() => navigate(`/personajes/${character.id}`)}>
                Abrir
              </button>{' '}
              <Link to={`/personajes/${character.id}`}>Ver</Link>
            </div>
          </div>
        ))}
      </section>

      <Pagination
        page={page}
        totalPage={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </main>
  )
}
