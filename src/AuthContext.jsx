import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Upewnij się, że ścieżka do Twojego pliku firebase.js jest poprawna

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged nasłuchuje zmian w Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Kończymy ładowanie, gdy wiemy już, jaki jest status
    });

    // Sprzątanie po odmontowaniu komponentu
    return () => unsubscribe();
  }, []);

  // Nie renderujemy aplikacji dopóki nie dowiemy się, czy ktoś jest zalogowany
  if (loading) return <div>Ładowanie danych użytkownika...</div>;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Własny hook, żeby łatwiej korzystać z kontekstu w innych plikach
export const useAuth = () => useContext(AuthContext);
