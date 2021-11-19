import { createContext, useContext } from 'react'
import authService from './auth.service'
import { AuthContextAPI, User } from './auth.types'
import { useState } from 'react'
import { MessageType, ApiResponse } from '../../lib/api'

const AuthContext = createContext<AuthContextAPI>({} as AuthContextAPI)

const AuthProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<ApiResponse<MessageType> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User>({} as User)

  const signUp = (userSignUp: User): void => {
    setLoading(true)
    authService
      .signUp(userSignUp)
      .then(() => {})
      .catch((newError: any) => {
        setError(newError)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return <AuthContext.Provider value={{ error, user, signUp, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
