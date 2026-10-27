import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <>
      <h1>Inicio</h1>
      <h2>Bienvenido a la app de Rick and Morty</h2>
      <p>
        Explora la lista de{' '}
        <Link to="/personajes">personajes de Rick and Morty</Link> o inicia
        sesión para ver tu perfil.
      </p>
    </>
  )
}
