export interface Promotion {
  name: string;
  promoImage: PromoImage;
  promoLogoImage: PromoImage;
  promoHeaderText: string;
  promoBodyText: string;
  promoCtaLabel: string;
  promoCtaLink: string;
  openNewWindow: boolean;
}

export interface PromoImage {
  title: string;
  path: string;
  url: string;
  public_id: string;
  raw_transformation: string;
}

export interface ConstructorStanding {
  position: number;
  team: string;
  points: number;
}
