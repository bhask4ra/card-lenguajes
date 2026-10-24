import { useState, useEffect } from 'react'
import './App.css'
import LanguageCard from './components/LanguageCard';
import Pagination from './components/Pagination';
import { useCharacteres } from './useCharacteres';

function App() {
  const [page, setPage] = useState(() => Number(localStorage.getItem('rm_page')) || 1)

  useEffect(() => {
    localStorage.setItem('rm_page', String(page))
  }, [page])
  const { characters, totalPages, loading, error } = useCharacteres(page);

  const statusColors = {
    Alive: '#10b981',
    Dead: '#ef4444',
    unknown: '#9ca3af',
  };
  const statusEmojis = {
    Alive: '🟢',
    Dead: '💀',
    unknown: '❓',
  };

  return (
    <main className="app">
      <h1>Rick and Morty</h1>
      {loading && <p>Cargando ....</p>}
      {error && <p role="alert"> ocurrio un error {error}</p>}

      <section className="cards-grid">
        {characters.map((character) => (
          <LanguageCard
            key={character.id}
            nombre={character.name}
            anio={new Date(character.created).getFullYear()}
            tipo={character.status}
            descripcion={`${character.species} • ${character.gender} • Origen: ${character.origin?.name ?? 'Desconocido'}`}
            emoji={statusEmojis[character.status] ?? '❓'}
            color={statusColors[character.status] ?? '#6366f1'}
          />
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

export default App
