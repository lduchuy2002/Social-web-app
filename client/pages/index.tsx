import type { NextPage } from 'next'
import { useAuth } from '../context/Auth'

const Home: NextPage = () => {
  console.log('run')
  const { user } = useAuth()
  return <div className="text-center text-danger font-weight-800">Welcome {user?.userName} to PupuKity App!</div>
}

export default Home
