export interface Country {
    name: {
      common: string;
    };
    capital: string[];
    population: number;
    region: string;
    flags: {
      png: string;
    };
    currencies?: { [key: string]: { name: string; symbol: string } };
    languages?: { [key: string]: string };
    timezones?: string[];
  }
  