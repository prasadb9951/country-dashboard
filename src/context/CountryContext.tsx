"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Country {
  name: { common: string };
  capital?: string[];
  population: number;
  region: string;
  flags: { png: string };
}

interface CountryContextType {
  countries: Country[];
  filteredCountries: Country[];
  loading: boolean;
  error: string | null;
  sortOrder: "asc" | "desc";
  searchTerm: string;
  selectedRegion: string;
  sortCountriesByPopulation: () => void;
  filterByRegion: (region: string) => void;
  searchCountries: (term: string) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
        setLoading(false);
      })
      .catch(() => setError("Failed to fetch country data"));
  }, []);

  const sortCountriesByPopulation = () => {
    const sorted = [...filteredCountries].sort((a, b) =>
      sortOrder === "asc" ? b.population - a.population : a.population - b.population
    );
    setFilteredCountries(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filterByRegion = (region: string) => {
    setSelectedRegion(region);
    if (region === "") {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(countries.filter((country) => country.region === region));
    }
  };

  const searchCountries = (term: string) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const results = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(lowercasedTerm) ||
        (country.capital && country.capital.some((cap) => cap.toLowerCase().includes(lowercasedTerm)))
    );
    setFilteredCountries(results);
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        filteredCountries,
        loading,
        error,
        sortOrder,
        searchTerm,
        selectedRegion,
        sortCountriesByPopulation,
        filterByRegion,
        searchCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) throw new Error("useCountryContext must be used within a CountryProvider");
  return context;
};
