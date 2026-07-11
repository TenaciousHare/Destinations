import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import Generator from "./Generator"; // Twój główny widok

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Główna publiczna strona - tam gdzie generujesz i drukujesz */}
          <Route path="/" element={<Generator />} />

          {/* Ścieżka do logowania */}
          <Route path="/login" element={<Login />} />

          {/* Chroniona ścieżka do panelu zarządzania bazą */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;