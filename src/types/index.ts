export interface Farmer {
  id: string;
  name: string;
  age: number;
  state: string;
  district: string;
  city: string;
  landSize: number;
  crops: string[];
  annualIncome: number;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    states?: string[];
    minLandSize?: number;
    maxLandSize?: number;
    maxAnnualIncome?: number;
    requiredCrops?: string[];
  };
  benefits: string[];
  applicationProcess: string;
  documents: string[];
  websiteUrl: string;
}