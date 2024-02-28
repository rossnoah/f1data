import { Hono } from "hono";
import { apiKey } from ".";
import { fetchHistoricalConstructorStandings } from "./scraping/historical/ConstructorStanding";

const app = new Hono();

app.get("/constructors/:year", async (c) => {
  const { year } = c.req.param();

  try {
    const data = await fetchHistoricalConstructorStandings(year);

    if (!data) {
      throw new Error("Data is null");
    }

    return c.json(data);
  } catch (error) {
    return c.text("Failed to fetch the Historical Constructor Listing", 500);
  }
});

export default app;
