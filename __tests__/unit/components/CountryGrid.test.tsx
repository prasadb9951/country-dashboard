import { render, screen, fireEvent } from "@testing-library/react";
import CountryGrid from "../../../src/app/components/CountryGrid";
import { describe, test, expect } from "@jest/globals";
import "@testing-library/jest-dom";

const mockCountries = [
  { name: { common: "India" }, cca2: "IN", population: 1400000000, flags: { png: "/india.png" } },
];

describe("CountryGrid Component", () => {
  test("renders country names", () => {
    render(<CountryGrid countries={mockCountries} onSelect={jest.fn()} loadMore={jest.fn()} />);
    expect(screen.getByText("India")).toBeInTheDocument();
  });

  test("calls onSelect when a country is clicked", () => {
    const onSelectMock = jest.fn();
    render(<CountryGrid countries={mockCountries} onSelect={onSelectMock} loadMore={jest.fn()} />);

    fireEvent.click(screen.getByText("India"));
    expect(onSelectMock).toHaveBeenCalledWith(mockCountries[0]);
  });
});
