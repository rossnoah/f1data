import { fetchDataWithCache } from "../caching";
import { ConstructorStanding } from "../types";
import { JSDOM } from "jsdom";

export async function fetchHistoricalConstructorStandings(
  year: string
): Promise<ConstructorStandingsResponse> {
  const url = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/team.html`;

  try {
    // Use your caching mechanism to fetch data
    const htmlContent = await fetchDataWithCache(url, "apikey");
    if (!htmlContent) throw new Error("No HTML content fetched");

    const data = parseConstructorStandings(htmlContent);

    return {
      year,
      standings: data,
    };
  } catch (error) {
    console.error(`Failed to fetch Constructor Standings for ${year}:`, error);
    throw new Error(`Failed to fetch Constructor Standings for ${year}`);
  }
}

function parseConstructorStandings(htmlContent: string): ConstructorStanding[] {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const standings: ConstructorStanding[] = [];

  document.querySelectorAll(".resultsarchive-table tbody tr").forEach((row) => {
    const positionElement = row.children[1]?.textContent?.trim();
    const teamElement = row.children[2]?.textContent?.trim();
    const pointsElement = row.children[3]?.textContent?.trim();

    if (positionElement && teamElement && pointsElement) {
      const position = parseInt(positionElement);
      const team = teamElement;
      const points = parseInt(pointsElement);
      if (!isNaN(position) && !isNaN(points)) {
        standings.push({ position, team, points });
      }
    }
  });

  return standings;
}

interface ConstructorStandingsResponse {
  year: string;
  standings: ConstructorStanding[];
}
