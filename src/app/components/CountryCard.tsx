"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface CountryProps {
  country: {
    name: { common: string };
    capital?: string[];
    population: number;
    region: string;
    flags: { png: string };
  };
  onSelect?: (country: CountryProps["country"]) => void; // Optional prop
}

const CountryCard: React.FC<CountryProps> = ({ country, onSelect }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className="border p-4 rounded shadow-lg cursor-pointer"
      onClick={() => onSelect?.(country)} // Ensure onSelect exists before calling
    >
      {inView ? (
        <>
          <Image
            src={country.flags.png}
            alt={country.name.common}
            width={200}
            height={120}
            className="w-full h-auto object-cover"
            priority={false}
          />
          <h2 className="text-xl font-bold">{country.name.common}</h2>
          <p>Capital: {country.capital?.[0] || "N/A"}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
        </>
      ) : (
        <div className="h-[150px] bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default React.memo(CountryCard);