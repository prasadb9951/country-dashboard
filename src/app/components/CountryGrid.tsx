import React from "react";
import Image from "next/image";

interface Country {
  cca2: string;
  name: { common: string };
  population: number;
  flags: { png: string; alt?: string };
}

interface CountryGridProps {
  countries: Country[];
  onSelect: (country: Country) => void;
}

const CountryGrid: React.FC<CountryGridProps> = ({ countries, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <div
          key={country.cca2 || country.name.common}
          onClick={() => onSelect(country)}
          className="cursor-pointer p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <Image
            src={country.flags.png}
            alt={country.flags.alt ?? "Flag"}
            width={200}
            height={120}
            className="rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-center">{country.name.common}</h3>
          <p className="text-center text-sm">Population: {country.population.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryGrid;
