import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Jeśli nie ma zalogowanego użytkownika, przekieruj na /login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Jeśli jest zalogowany, wyrenderuj to, co jest w środku (czyli panel admina)
  return children;
};

export default ProtectedRoute;