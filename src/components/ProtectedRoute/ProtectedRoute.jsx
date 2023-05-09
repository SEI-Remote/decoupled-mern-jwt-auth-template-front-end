// npm modules
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/auth/login" />
  return children
}

export default ProtectedRoute
