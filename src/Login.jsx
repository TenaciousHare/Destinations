import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Czyścimy błędy przed nową próbą

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Jeśli logowanie się uda, przenosimy użytkownika do panelu admina
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Nieprawidłowy email lub hasło.");
    }
  };

  return (
    <div className="login-container">
      <h2>Zaloguj się do panelu</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Adres E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="btn-login">
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default Login;
