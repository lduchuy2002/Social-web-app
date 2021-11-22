import api, { ApiResponse } from '../../lib/api'
import { User, AuthCredential } from './auth.types'

const getCurrentUser = async (): Promise<User>  => {
  const response = await api.get('me')
  return response.data
}

const signUp = async (userSignUp: User): Promise<ApiResponse> => {
  const response = await api.post('sign-up', userSignUp)
  return response.data
}

const signIn = async (credential: AuthCredential): Promise<ApiResponse<User>> => {
  const response = await api.post('sign-in', credential)
  return response.data
}

const authService = { getCurrentUser, signUp, signIn }
export default authService
