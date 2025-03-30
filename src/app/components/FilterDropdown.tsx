import React from "react";

interface FilterDropdownProps {
  selectedRegion: string;
  setRegion: (region: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ selectedRegion, setRegion }) => {
  return (
    <select onChange={(e) => setRegion(e.target.value)} value={selectedRegion}>
      <option value="All">All Regions</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default FilterDropdown;
