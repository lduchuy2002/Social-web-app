import { ApiResponse } from '../../lib/api'

export interface User {
  userName: string
  email: string
  birthday: string
  gender: 0 | 1
  password: string
}
export interface AuthCredential {
  email: string
  password: string
}

export interface AuthProviderState {
  user: User | null
  loading: boolean
  error: ApiResponse | null
}

export interface AuthContextAPI extends AuthProviderState {
  signUp: (user: User) => void
  signIn: (credential: AuthCredential) => void
}
