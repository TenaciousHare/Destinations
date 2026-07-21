import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

const Generator = () => {
  const { currentUser } = useAuth();

  const [destinations, setDestinations] = useState({ KTW: [], KRK: [] });
  const [selectedAirport, setSelectedAirport] = useState("KTW");
  const [abbr, setAbbr] = useState([]);
  const [exp, setExp] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const data = querySnapshot.docs.map((doc) => doc.data());

      const ktw = data.filter((d) => d.airport === "KTW");
      const krk = data.filter((d) => d.airport === "KRK");

      setDestinations({ KTW: ktw, KRK: krk });
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      handleGenerate();
    }
  }, [loading, selectedAirport]);

  function losoweWartosci(lotnisko, ilosc, klucz) {
    const tablica = destinations[lotnisko];
    if (!tablica || !tablica.length || ilosc <= 0) return [];

    const wylosowaneWartosci = [];
    const pomocniczaTablica = [...tablica];

    for (let i = 0; i < ilosc; i++) {
      if (pomocniczaTablica.length === 0) break; // Zabezpieczenie przed brakiem danych
      const losowyIndeks = Math.floor(Math.random() * pomocniczaTablica.length);
      const wartosc = pomocniczaTablica[losowyIndeks][klucz];
      wylosowaneWartosci.push(wartosc);
      pomocniczaTablica.splice(losowyIndeks, 1);
    }
    return wylosowaneWartosci;
  }

  function handleGenerate() {
    setAbbr(losoweWartosci(selectedAirport, 20, "abbreviation"));
    setExp(losoweWartosci(selectedAirport, 20, "expansion"));
  }

  if (loading) {
    return <div className="loading-container">Ładowanie danych z bazy...</div>;
  }

  return (
    <div className="wrapper">
      <div className="controls">
        <select
          onChange={(e) => setSelectedAirport(e.target.value)}
          value={selectedAirport}
        >
          <option value="KTW">KTW</option>
          <option value="KRK">KRK</option>
        </select>
        <button onClick={() => window.print()}>DRUKUJ</button>
        <button onClick={handleGenerate}>GENERUJ</button>

        {currentUser ? (
          <Link to="/admin">
            <button className="btn-success">Panel Admina</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Zaloguj się</button>
          </Link>
        )}
      </div>

      <div className="list">
        <div className="page">
          <div className="name">
            <p>Imię: ....................</p>
            <p>Nazwisko: ....................</p>
            <p>Data: ....................</p>
          </div>
          <h2>
            1. Napisz, które destynacje są w strefie Schengen, a które w
            Non-Schengen, oraz rozwiń skróty lotnisk
          </h2>
          <ul>
            {abbr.map((abbrItem, index) => (
              <div key={`${abbrItem}-${index}`}>
                <li>{abbrItem}</li>
                <hr />
              </div>
            ))}
          </ul>
        </div>

        <div className="page">
          <h2>2. Zapisz skróty lotnisk według kodów IATA + Państwo</h2>
          <ul>
            {exp.map((expItem, index) => (
              <div key={`${expItem}-${index}`}>
                <li>{expItem}</li>
                <hr />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Generator;
