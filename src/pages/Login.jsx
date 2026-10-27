import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [nombre, setNombre] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const enviar = (e) => {
    e.preventDefault()
    if (!nombre.trim()) return
    login(nombre)
    navigate('/perfil', { replace: true })
  }

  return (
    <>
      <h1>Simulación del login</h1>
      <form onSubmit={enviar}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="paquito"
        />
        <button type="submit">Login</button>
      </form>
    </>
  )
}
