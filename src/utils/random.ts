import type { Destination } from "./../types";

export function losoweWartosci(
  tablica: Destination[],
  ilosc: number,
  klucz: keyof Destination,
): string[] {
  if (!tablica || !tablica.length || ilosc <= 0) return [];

  const wylosowaneWartosci: string[] = [];
  const pomocniczaTablica = [...tablica];

  for (let i = 0; i < ilosc; i++) {
    if (pomocniczaTablica.length === 0) break;
    const losowyIndeks = Math.floor(Math.random() * pomocniczaTablica.length);
    wylosowaneWartosci.push(pomocniczaTablica[losowyIndeks][klucz]);
    pomocniczaTablica.splice(losowyIndeks, 1);
  }
  return wylosowaneWartosci;
}
