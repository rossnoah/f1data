import axios from "axios";
import fs from "fs";
import path from "path";

const TOKEN_FILE_PATH = path.join(__dirname, "apiToken.json");

// Function to save API key to a local file
function saveToken(apiKey: string) {
  const data = {
    apiKey,
    timestamp: new Date().getTime(), // Current time in milliseconds
  };
  fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(data, null, 2));
}

// Function to read API key from a local file
function readToken() {
  if (fs.existsSync(TOKEN_FILE_PATH)) {
    const data = JSON.parse(fs.readFileSync(TOKEN_FILE_PATH, "utf8"));
    // Check if the token is still valid based on your expiration criteria
    // For example, if the token expires in 24 hours:
    if (new Date().getTime() - data.timestamp < 24 * 60 * 60 * 1000) {
      return data.apiKey;
    }
  }
  return null;
}

export async function getApiKey() {
  // First, try to read the token from the local cache
  const cachedApiKey = readToken();
  if (cachedApiKey) {
    return cachedApiKey;
  }

  // If the token is not in the cache or is expired, fetch a new one
  try {
    const response = await axios.get("https://www.formula1.com");
    const dataString = response.data.toString();
    const apiKeyMatch = dataString.match(/"apiKey":\s*"([^"]+)"/);

    if (apiKeyMatch && apiKeyMatch.length > 1) {
      // Save the new token to the local file
      saveToken(apiKeyMatch[1]);
      return apiKeyMatch[1];
    } else {
      console.error("API key not found in the response data.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching the API key:", error);
    return null;
  }
}
