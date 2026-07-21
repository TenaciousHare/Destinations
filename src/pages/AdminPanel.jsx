import { useState, useEffect, useMemo } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminPanel = () => {
  const { currentUser } = useAuth();

  const KRK_USER_EMAIL = "krk@admin.com";
  const KTW_USER_EMAIL = "ktw@admin.com";

  const isKrkUser = currentUser?.email === KRK_USER_EMAIL;
  const isKtwUser = currentUser?.email === KTW_USER_EMAIL;
  const isRestrictedUser = isKrkUser || isKtwUser; // True, jeśli to KRK lub KTW

  const [destinations, setDestinations] = useState([]);

  // Domyślny filtr: Jeśli to KRK to "KRK", jeśli KTW to "KTW", w przeciwnym razie główny admin widzi "ALL"
  const [filterAirport, setFilterAirport] = useState(
    isKrkUser ? "KRK" : isKtwUser ? "KTW" : "ALL",
  );

  const [sortConfig, setSortConfig] = useState({
    key: "country",
    direction: "ascending",
  });

  const [formData, setFormData] = useState({
    abbreviation: "",
    expansion: "",
    country: "",
    zone: "Schengen",

    airport: isKrkUser ? "KRK" : isKtwUser ? "KTW" : "KTW",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "destinations"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDestinations(data);
      },
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "destinations"), formData);

    setFormData({
      abbreviation: "",
      expansion: "",
      country: "",
      zone: "Schengen",
      airport: isKrkUser
        ? "KRK"
        : isKtwUser
          ? "KTW"
          : filterAirport !== "ALL"
            ? filterAirport
            : "KTW",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Na pewno usunąć ten wpis?")) {
      await deleteDoc(doc(db, "destinations", id));
    }
  };

  const displayedDestinations = destinations.filter((dest) => {
    if (filterAirport === "ALL") return true;
    return dest.airport === filterAirport;
  });

  const sortedDestinations = useMemo(() => {
    let sortableItems = [...displayedDestinations];

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const dir = sortConfig.direction === "ascending" ? 1 : -1;

        if (sortConfig.key === "country" || sortConfig.key === "zone") {
          const zoneA = a.zone === "Schengen" ? 0 : 1;
          const zoneB = b.zone === "Schengen" ? 0 : 1;

          if (zoneA !== zoneB) {
            return (zoneA - zoneB) * dir;
          }

          const countryA = (a.country || "").toLowerCase();
          const countryB = (b.country || "").toLowerCase();

          if (countryA !== countryB) {
            return countryA < countryB ? -1 * dir : 1 * dir;
          }

          const cityA = (a.expansion || "").toLowerCase();
          const cityB = (b.expansion || "").toLowerCase();

          if (cityA !== cityB) {
            return cityA < cityB ? -1 * dir : 1 * dir;
          }

          return 0;
        }

        let aValue = (a[sortConfig.key] || "").toString().toLowerCase();
        let bValue = (b[sortConfig.key] || "").toString().toLowerCase();

        if (aValue < bValue) return -1 * dir;
        if (aValue > bValue) return 1 * dir;
        return 0;
      });
    }
    return sortableItems;
  }, [displayedDestinations, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " 🔼" : " 🔽";
    }
    return "";
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Panel Administratora</h1>
          <p className="admin-user-info">
            Zalogowano jako: <strong>{currentUser?.email}</strong>{" "}
            {isKrkUser && "(Ograniczony dostęp: Tylko KRK)"}
            {isKtwUser && "(Ograniczony dostęp: Tylko KTW)"}
          </p>
        </div>
        <div className="admin-actions">
          <Link to="/">
            <button className="btn-nav">Generator Testów</button>
          </Link>
          <Link to="/admin/print">
            <button className="btn-success">Generator Tabel do Wydruku</button>
          </Link>
          <button onClick={() => signOut(auth)} className="btn-nav">
            Wyloguj
          </button>
        </div>
      </header>

      <div className="add-form-container">
        <h3>Dodaj nową destynację</h3>
        <form onSubmit={handleAdd} className="add-form">
          <input
            type="text"
            placeholder="IATA (np. WAW)"
            required
            value={formData.abbreviation}
            onChange={(e) =>
              setFormData({
                ...formData,
                abbreviation: e.target.value.toUpperCase(),
              })
            }
          />
          <input
            type="text"
            placeholder="Miasto"
            required
            value={formData.expansion}
            onChange={(e) =>
              setFormData({ ...formData, expansion: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Kraj"
            required
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
          <select
            value={formData.zone}
            onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
            className="form-select"
          >
            <option value="Schengen">Schengen</option>
            <option value="Non-Schengen">Non-Schengen</option>
          </select>
          <select
            value={formData.airport}
            onChange={(e) =>
              setFormData({ ...formData, airport: e.target.value })
            }
            disabled={isRestrictedUser}
            title={
              isRestrictedUser ? "Nie możesz zmienić lotniska startowego" : ""
            }
            className="form-select"
          >
            <option value="KTW">KTW</option>
            <option value="KRK">KRK</option>
          </select>
          <button type="submit" className="btn-success">
            Dodaj wpis
          </button>
        </form>
      </div>

      <div className="table-controls">
        <h3 className="table-title">
          Lista destynacji w bazie ({sortedDestinations.length})
        </h3>

        {!isRestrictedUser && (
          <div>
            <label className="filter-label">Filtruj tabelę:</label>
            <select
              value={filterAirport}
              onChange={(e) => setFilterAirport(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Wszystkie lotniska</option>
              <option value="KTW">Tylko KTW</option>
              <option value="KRK">Tylko KRK</option>
            </select>
          </div>
        )}
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th onClick={() => requestSort("abbreviation")}>
              IATA{getSortIndicator("abbreviation")}
            </th>
            <th onClick={() => requestSort("expansion")}>
              Miasto{getSortIndicator("expansion")}
            </th>
            <th onClick={() => requestSort("country")}>
              Kraj{getSortIndicator("country")}
            </th>
            <th onClick={() => requestSort("zone")}>
              Strefa{getSortIndicator("zone")}
            </th>
            <th onClick={() => requestSort("airport")}>
              Lotnisko startowe{getSortIndicator("airport")}
            </th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {sortedDestinations.map((dest) => {
            const canDelete =
              !isRestrictedUser ||
              (isKrkUser && dest.airport === "KRK") ||
              (isKtwUser && dest.airport === "KTW");

            return (
              <tr key={dest.id}>
                <td>
                  <strong>{dest.abbreviation}</strong>
                </td>
                <td>{dest.expansion}</td>
                <td>{dest.country}</td>
                <td>
                  <span
                    className={
                      dest.zone === "Schengen"
                        ? "zone-schengen"
                        : "zone-non-schengen"
                    }
                  >
                    {dest.zone}
                  </span>
                </td>
                <td>{dest.airport}</td>
                <td>
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(dest.id)}
                      className="btn-danger"
                    >
                      Usuń
                    </button>
                  )}
                </td>
              </tr>
            );
          })}

          {sortedDestinations.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-state">
                Brak danych do wyświetlenia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
