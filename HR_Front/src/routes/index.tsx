import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useAuth } from '../contexts/auth'

export function Router() {
  const { signed } = useAuth()

  return signed ? <AppRoutes /> : <AuthRoutes />
}
