import React from "react";

interface CountryModalProps {
  country: {
    name: {
      common: string;
      official: string;
      nativeName?: Record<string, { common: string; official: string }>;
    };
    flag: string;
    population: number;
    region: string;
    capital: string;
  } | null;
  onClose: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <img src={country.flag} alt={`${country.name.common} flag`} className="flag-image" />
        <h2>{country.name.common}</h2>
        <p><strong>Official Name:</strong> {country.name.official}</p>
        {country.name.nativeName && (
          <p><strong>Native Name:</strong> {Object.values(country.name.nativeName)[0].common}</p>
        )}
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CountryModal;
