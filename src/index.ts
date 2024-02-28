import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { getApiKey } from "./scraping/apikey";
import { PrismaClient } from "@prisma/client";
import current from "./current";
import historical from "./historical";

export const prisma = new PrismaClient();
const app = new Hono();
export let apiKey: string;

app.get("/", (c) => {
  return c.text("Hello from F1Data!");
});

app.route("current", current);
app.route("historical", historical);

const port = 3000;

// Encapsulate the asynchronous operations in an async IIFE
(async () => {
  // Get the API key
  apiKey = await getApiKey();
  console.log(apiKey);

  // Start the server
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
})();
