export const sortCountriesByPopulation = (countries: any[], order: "asc" | "desc") => {
  return [...countries].sort((a, b) =>
    order === "asc" ? a.population - b.population : b.population - a.population
  );
};

export const filterCountriesByRegion = (countries: any[], region: string) => {
  return region === "All" ? countries : countries.filter((c) => c.region === region);
};
