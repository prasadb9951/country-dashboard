"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";
import CountryDashboard from "../app/components/CountryDashboard";
import { useFetch } from "../hooks/useFetch";

export default function Page() {
  const { theme, toggleTheme } = useTheme();
  const { data, loading, error } = useFetch("https://restcountries.com/v3.1/all");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Theme Toggle Button */}
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
      </button>

      {/* Country Dashboard */}
      <CountryDashboard initialData={data} />
    </div>
  );
}
