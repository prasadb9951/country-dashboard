import React from "react";
import { CountryProvider } from "../context/CountryContext";
import { ThemeProvider } from "../context/ThemeContext";
import "./globals.css";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CountryProvider>{children}</CountryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
