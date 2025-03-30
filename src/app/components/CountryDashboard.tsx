"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import CountryGrid from "./CountryGrid";
import SortButton from "./SortButton";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

interface Country {
  name: { common: string };
  cca2: string;
  flags: { png: string; alt?: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: { [key: string]: string };
}

const CountryDashboard = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Sorting function
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  }, []);

  // Filter and sort countries using memoization
  const filteredAndSortedCountries = useMemo(() => {
    let updatedCountries = [...countries];

    // Apply search filter
    if (search) {
      updatedCountries = updatedCountries.filter(
        (c) =>
          c.name.common.toLowerCase().includes(search.toLowerCase()) ||
          c.capital?.some((cap) => cap.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply region filter
    if (selectedRegion !== "All") {
      updatedCountries = updatedCountries.filter((c) => c.region === selectedRegion);
    }

    // Apply sorting
    return updatedCountries.sort((a, b) =>
      sortOrder === "asc" ? a.population - b.population : b.population - a.population
    );
  }, [search, selectedRegion, countries, sortOrder]);

  useEffect(() => {
    setFilteredCountries(filteredAndSortedCountries);
  }, [filteredAndSortedCountries]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition duration-300">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Country Dashboard</h1>

        {/* Search & Filter */}
        <SearchBar search={search} setSearch={setSearch} />
        <FilterDropdown selectedRegion={selectedRegion} setRegion={setSelectedRegion} />

        {/* Sorting */}
        <SortButton sortOrder={sortOrder} toggleSort={toggleSortOrder} />

        {loading ? (
          <p className="text-xl text-center py-4">Loading countries...</p>
        ) : selectedCountry ? (
          <div className="text-center">
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-blue-500 hover:text-blue-700 mb-4"
            >
              🔙 Back to Countries
            </button>
            <h2 className="text-2xl font-semibold">{selectedCountry.name.common}</h2>
            <img
              src={selectedCountry.flags.png}
              alt={selectedCountry.flags.alt || "Flag"}
              className="mx-auto my-4 w-40 h-auto rounded-lg"
            />
            <p><strong>Capital:</strong> {selectedCountry.capital?.join(", ") || "N/A"}</p>
            <p><strong>Region:</strong> {selectedCountry.region}</p>
            <p><strong>Subregion:</strong> {selectedCountry.subregion || "N/A"}</p>
            <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {selectedCountry.languages ? Object.values(selectedCountry.languages).join(", ") : "N/A"}</p>
          </div>
        ) : (
          <CountryGrid countries={filteredCountries} onSelect={setSelectedCountry} />
        )}
      </div>
    </div>
  );
};

export default CountryDashboard;
