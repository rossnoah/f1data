import axios from "axios";
import { prisma } from "..";

export async function fetchDataWithCache(
  endpoint: string,
  apiKey: string
): Promise<any> {
  // Use endpoint as cache key
  const cacheKey = endpoint;

  // Check cache first
  const cachedData = await prisma.cache.findUnique({
    where: { key: cacheKey },
  });

  // If cache exists and is fresh (e.g., less than 1 hour old), return cached data
  if (
    cachedData &&
    new Date().getTime() - new Date(cachedData.updatedAt).getTime() < 3600000
  ) {
    console.log("Returning data from cache");
    return JSON.parse(cachedData.value); // Deserialize the string back to JSON
  }

  // If cache is stale or doesn't exist, fetch new data
  try {
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
    });

    // Update or create cache entry with new data
    await prisma.cache.upsert({
      where: { key: cacheKey },
      update: { value: JSON.stringify(response.data) }, // Serialize data to a string
      create: {
        key: cacheKey,
        value: JSON.stringify(response.data), // Serialize data to a string
      },
    });

    console.log("Returning fresh data and updating cache");
    return response.data; // Return fresh data
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Optionally, return stale cache data if API request fails
    if (cachedData) {
      console.log("Returning stale data from cache due to API error");
      return JSON.parse(cachedData.value);
    }
    throw new Error("Failed to fetch data and no cache available");
  }
}
