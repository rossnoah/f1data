import { fetchDataWithCache } from "../caching";
import { Promotion } from "../types";

export async function fetchEditorialConstructorListing(
  apikey: string
): Promise<EditorialConstructorListingResponse> {
  const url =
    "https://api.formula1.com/v1/editorial-constructorlisting/listing";
  try {
    const data: EditorialConstructorListingResponse = await fetchDataWithCache(
      url,
      apikey
    );

    return data;
  } catch (error) {
    console.error("Failed to fetch the Editorial Constructor Listing:", error);
    throw new Error("Failed to fetch the Editorial Constructor Listing");
  }
}

interface EditorialConstructorListingResponse {
  season: string;
  title: string;
  seoDescription: string;
  promotions: Promotion[];
  seasonState: string;
  year: string;
  constructorStandingLength: string;
  constructors: Constructor[];
}

interface Constructor {
  drivers: ConstructorDriver[];
  teamColourCode: string;
  teamImage: string;
  teamPageUrl: string;
  teamCroppedImage: string;
  teamLogoImage: string;
  teamNegativeLogoImage: string;
  teamName: string;
  teamKey: string;
}

interface ConstructorDriver {
  driverImage: string;
  driverCountryFlagImage: string;
  driverLastName: string;
  driverFirstName: string;
  driverReference: string;
  driverNameFormat: "FirstNameIsPrimary" | "LastNameIsPrimary";
}
