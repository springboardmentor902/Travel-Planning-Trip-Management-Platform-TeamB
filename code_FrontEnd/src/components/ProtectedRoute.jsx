import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

/**
 * Route guard component: redirect to /login if user is not authenticated.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;