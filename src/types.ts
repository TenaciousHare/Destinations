export type Airport = "KTW" | "KRK";
export type Zone = "Schengen" | "Non-Schengen";

export interface Destination {
  abbreviation: string; // kod IATA, np. "WAW"
  expansion: string; // miasto
  country: string; // państwo
  zone: Zone; // strefa np. Schengen
  airport: Airport; // lotnisko
}

export interface DestinationWithId extends Destination {
  id: string;
}
