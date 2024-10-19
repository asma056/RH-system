import { Routes, Route } from 'react-router-dom'
import { Login, PasswordRecoverty, Register } from '../pages'

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recoverty" element={<PasswordRecoverty />} />
    </Routes>
  )
}
