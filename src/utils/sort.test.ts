import { describe, it, expect } from "vitest";
import { compareText, compareByCountryThenCity } from "./sort";
import type { Destination } from "../types";

const destynacja = (country: string, expansion: string): Destination => ({
  abbreviation: "XXX",
  expansion,
  country,
  zone: "Schengen",
  airport: "KTW",
});

describe("compareText", () => {
  it("sortuje polskie litery zgodnie z alfabetem (Ł po L, przed M)", () => {
    const wynik = ["Zambia", "Łotwa", "Litwa", "Malta"].sort(compareText);

    expect(wynik).toEqual(["Litwa", "Łotwa", "Malta", "Zambia"]);
  });

  it("nie rozróżnia wielkości liter", () => {
    expect(compareText("austria", "Austria")).toBe(0);
  });

  it("puste wartości trafiają przed niepuste", () => {
    expect(compareText("", "Austria")).toBeLessThan(0);
  });
});

describe("compareByCountryThenCity", () => {
  it("sortuje po kraju, a w obrębie kraju po mieście", () => {
    const lista = [
      destynacja("Niemcy", "Monachium"),
      destynacja("Włochy", "Rzym"),
      destynacja("Niemcy", "Berlin"),
      destynacja("Włochy", "Bergamo"),
    ];

    const wynik = lista
      .sort(compareByCountryThenCity)
      .map((d) => `${d.country}/${d.expansion}`);

    expect(wynik).toEqual([
      "Niemcy/Berlin",
      "Niemcy/Monachium",
      "Włochy/Bergamo",
      "Włochy/Rzym",
    ]);
  });
});
