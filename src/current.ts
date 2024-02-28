import { fetchEditorialDriverListing } from "./scraping/current/EditorialDriverListingResponse";
import { fetchEditorialConstructorListing } from "./scraping/current/EditorialConstructorListingResponse";

import { Hono } from "hono";
import { apiKey } from ".";

const app = new Hono();

app.get("/drivers", async (c) => {
  try {
    const data = await fetchEditorialDriverListing(apiKey);

    if (!data) {
      throw new Error("Data is null");
    }

    return c.json(data.drivers);
  } catch (error) {
    return c.text("Failed to fetch the Editorial Driver Listing", 500);
  }
});

app.get("/constructors", async (c) => {
  try {
    const data = await fetchEditorialConstructorListing(apiKey);

    if (!data) {
      throw new Error("Data is null");
    }

    return c.json(data.constructors);
  } catch (error) {
    return c.text("Failed to fetch the Editorial Constructor Listing", 500);
  }
});

export default app;
