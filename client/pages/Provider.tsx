import AuthProvider from '../context/Auth'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '../lib/theme'
import { ThemeProvider } from '@mui/material/styles'

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
  <AuthProvider>
      {children}
      <CssBaseline />
  </AuthProvider>
    </ThemeProvider>
)

export default Providers
