import { createContext, useContext, useReducer } from 'react'

const estadoInicial = {
  usuario: null,
  autenticado: false,
}

function authReducer(estado, accion) {
  switch (accion.type) {
    case 'LOGIN':
      return { usuario: accion.payload, autenticado: true }
    case 'LOGOUT':
      return estadoInicial
    default:
      return estado
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [estado, dispatch] = useReducer(authReducer, estadoInicial)
  const login = (usuario) => dispatch({ type: 'LOGIN', payload: usuario })
  const logout = () => dispatch({ type: 'LOGOUT' })

  return (
    <AuthContext.Provider value={{ ...estado, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
