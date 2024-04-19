import { DESTINATIONS } from "./constants/DESTINATIONS";
import "./App.css";
function App() {
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

  const randomAbbr = losoweWartosci(DESTINATIONS, 20, "abbreviation");
  const randomExp = losoweWartosci(DESTINATIONS, 20, "expansion");

  return (
    <>
      <div className="wrapper">
        <h2>
          1. Napisz, które destynacje są w strefie Schengen, a które w
          Non-Schengen, oraz rozwiń skróty lotnisk
        </h2>
        <ul>
          {randomAbbr.map((abbr) => (
            <li key={abbr}>{abbr}</li>
          ))}
        </ul>
        <h2>2. Zapisz skróty lotnisk według kodów IATA + Państwo</h2>
        <ul>
          {randomExp.map((exp) => (
            <li key={exp}>{exp}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => window.print()}>DRUKUJ</button>
    </>
  );
}

export default App;
