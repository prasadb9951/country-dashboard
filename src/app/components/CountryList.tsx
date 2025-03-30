import React, { useState } from "react";
import CountryModal from "./CountryModal";

interface Country {
  name: { common: string };
  cca2: string;
  capital?: string[];
  population: number;
  region: string;
  flags: { png: string };
}

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {countries.map((country) => (
        <div
          key={country.cca2} // Using cca2 for unique keys
          className="p-4 border rounded shadow-lg cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedCountry(country)}
        >
          <p className="text-lg font-semibold">{country.name.common}</p>
        </div>
      ))}

      {/* Show modal only when a country is selected */}
      {selectedCountry && (
        <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
      )}
    </div>
  );
};

export default CountryList;