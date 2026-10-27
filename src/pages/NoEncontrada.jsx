import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <>
      <h1>404</h1>
      <h2>Esta página no existe</h2>
      <Link to="/">Volver al inicio</Link>
    </>
  )
}
