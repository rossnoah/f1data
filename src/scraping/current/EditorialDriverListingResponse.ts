import { fetchDataWithCache } from "../caching";
import { Promotion } from "../types";

export async function fetchEditorialDriverListing(
  apikey: string
): Promise<EditorialDriverListingResponse> {
  const url = "https://api.formula1.com/v1/editorial-driverlisting/listing";
  try {
    const data: EditorialDriverListingResponse = await fetchDataWithCache(
      url,
      apikey
    );

    return data;
  } catch (error) {
    console.error("Failed to fetch the Editorial Driver Listing:", error);
    console.log("Error:", error);
    throw new Error("Failed to fetch the Editorial Driver Listing");
  }
}

interface EditorialDriverListingResponse {
  season: string;
  title: string;
  seoDescription: string;
  promotions: Promotion[];
  seasonState: string;
  year: string;
  driverStandingLength: string;
  drivers: Driver[];
}

interface Driver {
  teamColourCode: string;
  driverImage: string;
  driverCountryFlagImage: string;
  driverNumberImage: string;
  driverPageUrl: string;
  driverLastName: string;
  driverKey: string;
  driverFirstName: string;
  driverReference: string;
  teamName: string;
  teamKey: string;
  driverNameFormat: "FirstNameIsPrimary" | "LastNameIsPrimary";
}
