import { useState, useEffect, useMemo } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrintTables = () => {
  const { currentUser } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const KRK_USER_EMAIL = "krk@admin.com";
  const KTW_USER_EMAIL = "ktw@admin.com";

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDestinations(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const { schengen, nonSchengen } = useMemo(() => {
    // 1. Filtrowanie w zależności od użytkownika
    let filtered = destinations;
    if (currentUser?.email === KRK_USER_EMAIL) {
      filtered = destinations.filter((d) => d.airport === "KRK");
    } else if (currentUser?.email === KTW_USER_EMAIL) {
      filtered = destinations.filter((d) => d.airport === "KTW");
    }

    // 2. Sortowanie alfabetyczne krajów
    const sorted = [...filtered].sort((a, b) =>
      a.country.localeCompare(b.country),
    );

    return {
      schengen: sorted.filter((d) => d.zone === "Schengen"),
      nonSchengen: sorted.filter((d) => d.zone === "Non-Schengen"),
    };
  }, [destinations, currentUser]);

  if (loading)
    return <div className="admin-container">Ładowanie danych...</div>;

  return (
    <div className="print-page">
      <header className="print-header">
        <Link to="/admin">
          <button className="btn-nav">Wróć do Panelu</button>
        </Link>
        <button className="btn-success" onClick={() => window.print()}>
          DRUKUJ TABELE
        </button>
      </header>

      <div className="schengen-container">
        <h3>Strefa Schengen</h3>
        <table className="admin-table compact-table">
          <thead>
            <tr>
              <th>Kod IATA</th>
              <th>Miasto</th>
              <th>Kraj</th>
            </tr>
          </thead>
          <tbody>
            {schengen.map((d) => (
              <tr key={d.id}>
                <td>{d.abbreviation}</td>
                <td>{d.expansion}</td>
                <td>{d.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="non-schengen-container">
        <h3>Strefa Non-Schengen</h3>
        <table className="admin-table compact-table">
          <thead>
            <tr>
              <th>Kod IATA</th>
              <th>Miasto</th>
              <th>Kraj</th>
            </tr>
          </thead>
          <tbody>
            {nonSchengen.map((d) => (
              <tr key={d.id}>
                <td>{d.abbreviation}</td>
                <td>{d.expansion}</td>
                <td>{d.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PrintTables;
