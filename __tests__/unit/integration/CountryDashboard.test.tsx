import { render, screen, waitFor } from "@testing-library/react";
import CountryDashboard from "../../../src/app/components/CountryDashboard";
import { describe, test, expect } from "@jest/globals";
import "@testing-library/jest-dom";

// Mock API Fetch using Jest's fn
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { name: { common: "India" }, population: 1400000000, region: "Asia", flags: { png: "/india.png" } },
      ]),
  })
);

describe("CountryDashboard Integration Test", () => {
  test("fetches and displays countries", async () => {
    render(<CountryDashboard />);

    expect(screen.getByText("Loading countries...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("India")).toBeInTheDocument();
    });
  });
});
