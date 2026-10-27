import { useAuth } from '../auth/AuthContext'

export default function Perfil() {
  const { usuario } = useAuth()

  return (
    <h1>Logueado, hola {usuario}</h1>
  )
}
