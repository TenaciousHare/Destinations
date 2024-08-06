import { DEST_KTW, DEST_KRK } from "./constants/DESTINATIONS";
import "./App.css";
import { useState } from "react";
function App() {
  const [selectedAirport, setSelectedAirport] = useState("KTW");
  const [abbr, setAbbr] = useState(() =>
    losoweWartosci(selectedAirport, 20, "abbreviation")
  );
  const [exp, setExp] = useState(() =>
    losoweWartosci(selectedAirport, 20, "expansion")
  );

  function losoweWartosci(selectedAirport, ilosc, klucz) {
    const tablica = selectedAirport === "KTW" ? DEST_KTW : DEST_KRK;
    if (!tablica.length || ilosc <= 0) {
      return [];
    }

    const wylosowaneWartosci = [];

    const pomocniczaTablica = [...tablica];

    for (let i = 0; i < ilosc; i++) {
      const losowyIndeks = Math.floor(Math.random() * pomocniczaTablica.length);

      const wartosc = pomocniczaTablica[losowyIndeks][klucz];

      wylosowaneWartosci.push(wartosc);

      pomocniczaTablica.splice(losowyIndeks, 1);
    }
    return wylosowaneWartosci;
  }

  function handleGenerate() {
    setAbbr(() => losoweWartosci(selectedAirport, 20, "abbreviation"));
    setExp(() => losoweWartosci(selectedAirport, 20, "expansion"));
  }

  return (
    <div className="wrapper">
      <div>
        <select
          onChange={(e) => setSelectedAirport(e.target.value)}
          defaultValue="KTW"
        >
          <option value="KTW">KTW</option>
          <option value="KRK">KRK</option>
        </select>
        <button onClick={() => window.print()}>DRUKUJ</button>
        <button onClick={handleGenerate}>GENERUJ</button>
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
            {abbr.map((abbr) => (
              <div key={abbr}>
                <li>{abbr}</li>
                <hr />
              </div>
            ))}
          </ul>
        </div>
        <div className="page">
          <h2>2. Zapisz skróty lotnisk według kodów IATA + Państwo</h2>
          <ul>
            {exp.map((exp) => (
              <div key={exp}>
                <li>{exp}</li>
                <hr />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
