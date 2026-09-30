import { describe, it, expect } from "vitest";
import { losoweWartosci } from "./random";
import type { Destination } from "../types";

const destynacje: Destination[] = [
  {
    abbreviation: "WAW",
    expansion: "Warszawa",
    country: "Polska",
    zone: "Schengen",
    airport: "KTW",
  },
  {
    abbreviation: "STN",
    expansion: "Londyn Stansted",
    country: "Wielka Brytania",
    zone: "Non-Schengen",
    airport: "KTW",
  },
  {
    abbreviation: "DTM",
    expansion: "Dortmund",
    country: "Niemcy",
    zone: "Schengen",
    airport: "KTW",
  },
];

describe("losoweWartosci", () => {
  it("zwraca tyle wartości, ile poprosimy", () => {
    const wynik = losoweWartosci(destynacje, 2, "abbreviation");
    expect(wynik).toHaveLength(2);
  });

  it("nie zwraca więcej niż jest dostępnych elementów", () => {
    const wynik = losoweWartosci(destynacje, 10, "abbreviation");
    expect(wynik).toHaveLength(3);
  });

  it("losuje wartości pochodzące z danych wejściowych", () => {
    const wynik = losoweWartosci(destynacje, 3, "abbreviation");
    const dostepne = destynacje.map((d) => d.abbreviation);
    wynik.forEach((w) => expect(dostepne).toContain(w));
  });

  it("nie powtarza tej samej destynacji", () => {
    const wynik = losoweWartosci(destynacje, 3, "abbreviation");
    expect(new Set(wynik).size).toBe(wynik.length);
  });

  it("zwraca pustą tablicę dla ilości 0 lub mniejszej", () => {
    expect(losoweWartosci(destynacje, 0, "abbreviation")).toEqual([]);
    expect(losoweWartosci(destynacje, -5, "abbreviation")).toEqual([]);
  });

  it("zwraca pustą tablicę dla pustych danych", () => {
    expect(losoweWartosci([], 3, "abbreviation")).toEqual([]);
  });

  it("po kluczu 'country' zwraca wszystkie kraje z danych", () => {
    const wynik = losoweWartosci(destynacje, 3, "country");

    expect(wynik.sort()).toEqual(["Niemcy", "Polska", "Wielka Brytania"]);
  });
});
