import { DESTINATIONS } from "./constants/DESTINATIONS";
import "./App.css";
import { useState } from "react";
function App() {
  const [abbr, setAbbr] = useState(() =>
    losoweWartosci(DESTINATIONS, 20, "abbreviation")
  );
  const [exp, setExp] = useState(() =>
    losoweWartosci(DESTINATIONS, 20, "expansion")
  );

  function losoweWartosci(tablica, ilosc, klucz) {
    // Sprawdź, czy tablica jest pusta lub ilosc jest mniejsza od 0
    if (!tablica.length || ilosc <= 0) {
      return [];
    }

    // Utwórz nową pustą tablicę na wylosowane wartości
    const wylosowaneWartosci = [];

    // Skopiuj tablicę oryginalną do pomocniczej
    const pomocniczaTablica = [...tablica];

    // Pętla do wylosowania określonej liczby wartości
    for (let i = 0; i < ilosc; i++) {
      // Wylosuj losowy indeks w zakresie pozostałych elementów tablicy
      const losowyIndeks = Math.floor(Math.random() * pomocniczaTablica.length);

      // Pobierz wartość z klucza obiektu
      const wartosc = pomocniczaTablica[losowyIndeks][klucz];

      // Dodaj wylosowaną wartość do nowej tablicy
      wylosowaneWartosci.push(wartosc);

      // Usuń wylosowany obiekt z tablicy pomocniczej, aby uniknąć duplikatów
      pomocniczaTablica.splice(losowyIndeks, 1);
    }

    // Zwróć tablicę z wylosowanymi wartościami
    return wylosowaneWartosci;
  }

  function handleGenerate() {
    setAbbr(() => losoweWartosci(DESTINATIONS, 20, "abbreviation"));
    setExp(() => losoweWartosci(DESTINATIONS, 20, "expansion"));
  }

  return (
    <div className="wrapper">
      <div className="list">
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
            <li key={abbr}>{abbr}</li>
          ))}
        </ul>
        <h2>2. Zapisz skróty lotnisk według kodów IATA + Państwo</h2>
        <ul>
          {exp.map((exp) => (
            <li key={exp}>{exp}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => window.print()}>DRUKUJ</button>
        <button onClick={handleGenerate}>GENERUJ</button>
      </div>
    </div>
  );
}

export default App;
