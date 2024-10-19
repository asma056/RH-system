import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './components/GlobalStyle'
import { Router } from './routes'
import { AuthProvider } from './contexts/auth'

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </AuthProvider>
  )
}

export default App
