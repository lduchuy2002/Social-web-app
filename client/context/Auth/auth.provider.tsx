import { createContext, useContext, useEffect } from 'react'
import authService from './auth.service'
import { AuthContextAPI, AuthCredential, User } from './auth.types'
import { useState } from 'react'
import { MessageType, ApiResponse } from '../../lib/api';
import { useRouter } from 'next/router'

const AuthContext = createContext<AuthContextAPI>({} as AuthContextAPI)

const AuthProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<ApiResponse<MessageType> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    if(error) setError(null)
  }, [router.pathname])

  useEffect(() => {
    authService.getCurrentUser().then((res: ApiResponse<User>) => setUser(res.data)).catch(() => {})
  }, [router.pathname])

  useEffect(() => {
 
  }, [router.pathname])

  const signUp = (userSignUp: User): void => {
    setLoading(true)
    authService
      .signUp(userSignUp)
      .then(() => {})
      .catch((newError) => {
        setError(newError)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const signIn = (credential: AuthCredential) => {
    setLoading(true)
    authService
      .signIn(credential)
      .then((res: ApiResponse<User>) => setUser(res.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }
  if (['/login', '/register'].indexOf(router.pathname) > -1 && user) {
    router.push('/')
    return null
  }

  return <AuthContext.Provider value={{ error, user, loading, signUp, signIn }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
