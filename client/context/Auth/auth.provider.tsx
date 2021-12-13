import { createContext, useCallback, useContext, useEffect } from 'react'
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
  const [loadingInitial,setLoadingInitial] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    if(error) setError(null)
  }, [router.pathname])

  useEffect(() => {
    authService.getCurrentUser().then((res: ApiResponse<User>) => setUser(res.data)).catch(setError)
    .finally(()=>setLoadingInitial(false))
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

  const authContextValue = useCallback(()=>{
    return {
       error, user, loading, signUp, signIn 
    }
  },[error, loading, user]) 

  if (['/login', '/register'].indexOf(router.pathname) > -1 && user) {
    router.push('/')
    return null
  }

  return <AuthContext.Provider value={authContextValue()}>{loadingInitial === false && children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
