import { describe, test, expect } from "@jest/globals";
import { sortCountriesByPopulation, filterCountriesByRegion } from "../../src/utils/utils";

const mockCountries = [
  { name: { common: "A" }, population: 500000, region: "Asia" },
  { name: { common: "B" }, population: 1000000, region: "Europe" },
  { name: { common: "C" }, population: 200000, region: "Asia" },
];

describe("Utility Functions", () => {
  test("sortCountriesByPopulation should sort in ascending order", () => {
    const sorted = sortCountriesByPopulation(mockCountries, "asc");
    expect(sorted[0].population).toBe(200000);
    expect(sorted[1].population).toBe(500000);
    expect(sorted[2].population).toBe(1000000);
  });

  test("sortCountriesByPopulation should sort in descending order", () => {
    const sorted = sortCountriesByPopulation(mockCountries, "desc");
    expect(sorted[0].population).toBe(1000000);
    expect(sorted[1].population).toBe(500000);
    expect(sorted[2].population).toBe(200000);
  });

  test("filterCountriesByRegion should filter correctly", () => {
    const filtered = filterCountriesByRegion(mockCountries, "Asia");
    expect(filtered.length).toBe(2);
    expect(filtered[0].name.common).toBe("A");
    expect(filtered[1].name.common).toBe("C");
  });

  test("filterCountriesByRegion should return all countries when 'All' is selected", () => {
    const filtered = filterCountriesByRegion(mockCountries, "All");
    expect(filtered.length).toBe(mockCountries.length);
  });
});
