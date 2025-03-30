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
  },
  // Tamil Nadu Specific Schemes
  {
    id: 'uzhavan-app',
    name: 'Uzhavan App Scheme',
    description: 'Mobile application for Tamil Nadu farmers providing information and services',
    eligibilityCriteria: {
      states: ['Tamil Nadu']
    },
    benefits: [
      'Access to agriculture-related information',
      'Weather updates and forecasts',
      'Market prices for agricultural produce',
      'Subsidy application and tracking',
      'Direct interaction with agricultural officials'
    ],
    applicationProcess: 'Download the Uzhavan app from Google Play Store or Apple App Store and register with your details',
    documents: [
      'Aadhaar Card',
      'Land Records',
      'Mobile Phone Number',
      'Passport Size Photograph'
    ],
    websiteUrl: 'https://www.tn.gov.in/scheme/data_view/6853'
  },
  {
    id: 'cauvery-subsidy',
    name: 'Cauvery Basin Protection Scheme',
    description: 'Special scheme for farmers in the Cauvery Basin regions of Tamil Nadu',
    eligibilityCriteria: {
      states: ['Tamil Nadu'],
      minLandSize: 0.1
    },
    benefits: [
      'Subsidies for micro-irrigation systems',
      'Financial assistance for sustainable farming practices',
      'Training on water conservation methods',
      'Crop diversification support'
    ],
    applicationProcess: 'Apply through your local agriculture department with required documents',
    documents: [
      'Land Records showing location in Cauvery Basin',
      'Identity Proof',
      'Bank Account Details',
      'Water Usage Plan'
    ],
    websiteUrl: 'https://www.tn.gov.in/scheme/data_view/19157'
  },
  {
    id: 'crop-insurance-tn',
    name: 'Tamil Nadu Crop Insurance Scheme',
    description: 'State-level crop insurance scheme providing coverage against natural calamities',
    eligibilityCriteria: {
      states: ['Tamil Nadu'],
      minLandSize: 0.1
    },
    benefits: [
      'Comprehensive coverage against natural disasters',
      'Additional support beyond PMFBY',
      'Quick claim settlement',
      'Reduced premium rates for small and marginal farmers'
    ],
    applicationProcess: 'Apply through nearest agriculture extension center or online portal during designated periods',
    documents: [
      'Land Records',
      'Identity Proof',
      'Bank Account Details',
      'Proof of Crop Sown'
    ],
    websiteUrl: 'https://agri.tn.gov.in/crop-insurance'
  },
  // Recently Updated/Added National Schemes
  {
    id: 'pmdisy',
    name: 'Pradhan Mantri Kisan Sampada Yojana',
    description: 'Comprehensive package to create modern infrastructure for food processing',
    eligibilityCriteria: {
      minLandSize: 0.5
    },
    benefits: [
      'Financial assistance for setting up food processing units',
      'Support for creating integrated cold chains',
      'Modernization of food processing infrastructure',
      'Value addition to agricultural produce'
    ],
    applicationProcess: 'Apply online through the PMKSY portal or through state nodal agencies',
    documents: [
      'Project Proposal',
      'Land Documents',
      'Bank Loan Sanction Letter (if applicable)',
      'Identity and Address Proof',
      'NOC from Pollution Control Board'
    ],
    websiteUrl: 'https://pmksy.gov.in/'
  },
  {
    id: 'agri-infra-fund',
    name: 'Agriculture Infrastructure Fund',
    description: 'Financing facility for investment in agriculture infrastructure projects',
    eligibilityCriteria: {
      minLandSize: 0.5
    },
    benefits: [
      'Interest subvention of 3% on loans up to ₹2 crore',
      'Credit guarantee for loans up to ₹2 crore',
      'Support for post-harvest management projects',
      'Funding for community farming assets'
    ],
    applicationProcess: 'Apply through Primary Agricultural Credit Societies, Agriculture Marketing Cooperative Societies, or FPOs',
    documents: [
      'Project Report',
      'Land Documents',
      'Identity Proof',
      'Bank Account Details',
      'Cost Estimates'
    ],
    websiteUrl: 'https://agriinfra.dac.gov.in/'
  },
  {
    id: 'animal-husbandry-infra',
    name: 'Animal Husbandry Infrastructure Development Fund',
    description: 'Promotes investment by individual entrepreneurs and private companies in dairy infrastructure',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70
    },
    benefits: [
      'Interest subvention of 3% on loans',
      'Long repayment period of up to 10 years',
      'Support for establishing dairy processing facilities',
      'Funding for meat processing and animal feed plants'
    ],
    applicationProcess: 'Apply through participating banks or financial institutions',
    documents: [
      'Project Report',
      'Identity Proof',
      'Address Proof',
      'Bank Statement',
      'Business Plan'
    ],
    websiteUrl: 'https://dahd.nic.in/schemes/animal-husbandry-infrastructure-development-fund'
  },
  {
    id: 'e-nam',
    name: 'e-National Agriculture Market',
    description: 'Electronic trading platform connecting agricultural markets across India',
    eligibilityCriteria: {},
    benefits: [
      'Access to nationwide market for agricultural produce',
      'Better price discovery for farmers',
      'Transparent auction process',
      'Reduced market fees and commissions',
      'Direct payment to farmer bank accounts'
    ],
    applicationProcess: 'Register at your local APMC or through the e-NAM portal with required documents',
    documents: [
      'Identity Proof',
      'Bank Account Details',
      'Land Records',
      'Mobile Number'
    ],
    websiteUrl: 'https://enam.gov.in/'
  },
  {
    id: 'fpo-scheme',
    name: 'Formation and Promotion of Farmer Producer Organizations',
    description: 'Support for creating and nurturing Farmer Producer Organizations (FPOs)',
    eligibilityCriteria: {
      minLandSize: 0.1
    },
    benefits: [
      'Financial support of up to ₹18 lakh per FPO for 5 years',
      'Professional handholding support',
      'Credit guarantee facility',
      'Equity grant for matching member equity',
      'Training and capacity building'
    ],
    applicationProcess: 'Contact the nearest Krishi Vigyan Kendra or implementing agency in your region',
    documents: [
      'Group Resolution',
      'List of Farmer Members',
      'Bank Account Details',
      'Registration Documents (if already registered)'
    ],
    websiteUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1847709'
  },
  {
    id: 'soil-health-card',
    name: 'Soil Health Card Scheme',
    description: 'Provides information on soil health and recommended fertilizer doses',
    eligibilityCriteria: {
      minLandSize: 0.01
    },
    benefits: [
      'Free soil testing every two years',
      'Customized recommendations for nutrients and fertilizers',
      'Improved soil health and productivity',
      'Reduced input costs through optimal fertilizer use'
    ],
    applicationProcess: 'Apply at your nearest Soil Testing Laboratory or through local agriculture department',
    documents: [
      'Land Records',
      'Identity Proof',
      'Contact Details',
      'Soil Sample from your field'
    ],
    websiteUrl: 'https://soilhealth.dac.gov.in/'
  }
];