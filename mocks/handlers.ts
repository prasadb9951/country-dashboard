import { rest } from "msw";

export const handlers = [
  rest.get("https://restcountries.com/v3.1/all", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: { common: "India" }, cca2: "IN", population: 1400000000, flags: { png: "/india.png" } },
      ])
    );
  }),
];
