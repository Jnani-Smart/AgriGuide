import { Scheme } from '../types';

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN',
    description: 'Direct income support of ₹6,000 per year to farmer families',
    eligibilityCriteria: {
      maxAnnualIncome: 100000,
      minLandSize: 0.01,
    },
    benefits: [
      'Direct income support of ₹6,000 per year',
      'Amount released in three installments',
      'Direct transfer to bank accounts'
    ],
    applicationProcess: 'Apply through the PM-KISAN portal or visit your local agriculture office',
    documents: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details'
    ],
    websiteUrl: 'https://pmkisan.gov.in/'
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to protect farmers from crop failure',
    eligibilityCriteria: {
      minLandSize: 0.1,
    },
    benefits: [
      'Comprehensive risk coverage',
      'Low premium rates',
      'Use of technology for quick claim settlement'
    ],
    applicationProcess: 'Register through banks or insurance companies during crop season',
    documents: [
      'Land Records',
      'Bank Account Details',
      'Sowing Certificate'
    ],
    websiteUrl: 'https://pmfby.gov.in/'
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card',
    description: 'Provides farmers with timely access to credit',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 75
    },
    benefits: [
      'Short-term credit for cultivation',
      'Post-harvest expenses',
      'Maintenance of farm assets',
      'Insurance coverage'
    ],
    applicationProcess: 'Apply through your nearest bank branch or online banking portal',
    documents: [
      'Identity Proof',
      'Address Proof',
      'Land Records',
      'Passport Size Photographs',
      'Bank Account Details'
    ],
    websiteUrl: 'https://www.india.gov.in/spotlight/kisan-credit-card'
  },
  {
    id: 'pkvy',
    name: 'Paramparagat Krishi Vikas Yojana',
    description: 'Promotes organic farming practices',
    eligibilityCriteria: {
      minLandSize: 0.5
    },
    benefits: [
      'Financial assistance for organic farming',
      'Training on organic farming',
      'Certification support',
      'Marketing assistance'
    ],
    applicationProcess: 'Apply through your local agriculture department or PKVY portal',
    documents: [
      'Land Records',
      'Bank Account Details',
      'Farmer ID',
      'Soil Test Reports'
    ],
    websiteUrl: 'https://pgsindia-ncof.gov.in/pkvy/index.aspx'
  },
  {
    id: 'nmsa',
    name: 'National Mission for Sustainable Agriculture',
    description: 'Promotes sustainable agriculture practices',
    eligibilityCriteria: {
      minLandSize: 0.2
    },
    benefits: [
      'Water conservation support',
      'Soil health management',
      'Climate change adaptation measures',
      'Market development assistance'
    ],
    applicationProcess: 'Apply through state agriculture department or NMSA portal',
    documents: [
      'Land Records',
      'Bank Account Details',
      'Soil Health Card',
      'Identity Proof'
    ],
    websiteUrl: 'https://nmsa.dac.gov.in/'
  },
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization',
    description: 'Promotes farm mechanization and modern agriculture equipment',
    eligibilityCriteria: {
      maxAnnualIncome: 250000,
      minLandSize: 1
    },
    benefits: [
      'Subsidies on purchase of agricultural machinery',
      'Custom hiring facilities',
      'Training and demonstration of equipment',
      'Establishment of farm machinery banks'
    ],
    applicationProcess: 'Apply through state agriculture department or authorized dealers',
    documents: [
      'Land Records',
      'Income Certificate',
      'Bank Account Details',
      'Identity Proof'
    ],
    websiteUrl: 'https://farmech.dac.gov.in/'
  },
  {
    id: 'midh',
    name: 'Mission for Integrated Development of Horticulture',
    description: 'Promotes holistic growth of horticulture sector',
    eligibilityCriteria: {
      minLandSize: 0.2
    },
    benefits: [
      'Assistance for nursery development',
      'Support for protected cultivation',
      'Post-harvest management support',
      'Market development assistance'
    ],
    applicationProcess: 'Apply through state horticulture department',
    documents: [
      'Land Records',
      'Bank Account Details',
      'Project Proposal',
      'Identity Proof'
    ],
    websiteUrl: 'https://midh.gov.in/'
  }
];