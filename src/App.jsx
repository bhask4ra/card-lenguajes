import './App.css'
import { useAuth } from './auth/AuthContext'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Personajes from './pages/Personajes'
import PersonajeDetalle from './pages/PersonajeDetalle'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import NoEncontrada from './pages/NoEncontrada'
import RutaPrivada from './auth/RutaPrivada'

function App() {
  const { autenticado, usuario, logout } = useAuth()

  return (
    <div>
      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/personajes">Personajes</NavLink>
        <NavLink to="/perfil">Perfil</NavLink>
        {autenticado ? (
          <>
            <span>Hola {usuario}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personajes/:id" element={<PersonajeDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/perfil"
          element={
            <RutaPrivada>
              <Perfil />
            </RutaPrivada>
          }
        />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </div>
  )
}

export default App
