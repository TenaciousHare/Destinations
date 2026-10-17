import type { Destination } from "../types";

// Polska kolejność alfabetyczna (Ł po L, Ś po S itd.), bez rozróżniania wielkości liter.
const collator = new Intl.Collator("pl", { sensitivity: "base" });

export const compareText = (a: string, b: string): number =>
  collator.compare(a || "", b || "");

// Najpierw kraj, a w obrębie kraju miasto.
export const compareByCountryThenCity = (
  a: Destination,
  b: Destination,
): number =>
  compareText(a.country, b.country) || compareText(a.expansion, b.expansion);
