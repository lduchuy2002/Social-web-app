import api from '../../lib/api'
import { User } from './auth.types'

const signUp = async (userSignUp: User): Promise<User> => {
  const response = await api.post('/sign-up', userSignUp)
  console.log(response.data)
  return response.data
}
const authService = { signUp }
export default authService
