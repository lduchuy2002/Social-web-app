import Header from '../components/Commons/Header'
import { useAuth } from '../context/Auth'

const Home: React.FC = ({ children }) => {
  const { user } = useAuth()

  return (
    <>
    <Header />
    <div>Hello</div>
    </>
  )
}

export default Home
