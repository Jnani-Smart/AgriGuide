import { Scheme } from '../types';

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN',
    description: 'Direct income support of ₹6,000 per year to farmer families, with latest disbursement in April 2025',
    eligibilityCriteria: {
      minLandSize: 0.01,
    },
    benefits: [
      'Direct income support of ₹6,000 per year',
      'Amount released in three installments of ₹2,000 each',
      'Direct transfer to bank accounts',
      'Annual assistance for purchasing inputs like fertilizers, seeds, etc.'
    ],
    applicationProcess: 'Apply through the PM-KISAN portal or visit your nearest Common Service Centre (CSC)',
    documents: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details linked with Aadhaar'
    ],
    websiteUrl: 'https://pmkisan.gov.in/'
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive crop insurance scheme with coverage for pre-sowing to post-harvest losses',
    eligibilityCriteria: {
      minLandSize: 0.1,
    },
    benefits: [
      'Coverage for crop failure due to natural calamities',
      'Low premium rates: 2% for Kharif crops, 1.5% for Rabi crops',
      'Use of satellite technology and mobile apps for quick claim assessment',
      'Coverage for yield losses, prevented sowing, and post-harvest losses'
    ],
    applicationProcess: 'Register through banks at the time of availing crop loans or through insurance companies or CSCs during the notified period',
    documents: [
      'Land Records/Land Possession Certificate',
      'Bank Account Details',
      'Aadhaar Card',
      'Sowing Certificate/Crop Sown Declaration'
    ],
    websiteUrl: 'https://pmfby.gov.in/'
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card',
    description: 'Provides farmers with timely access to credit with interest subvention of 2%',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 75
    },
    benefits: [
      'Short-term credit for cultivation up to ₹3 lakhs at 7% interest rate',
      'Interest subvention of 2% for prompt repayment',
      'Coverage for post-harvest expenses and farm asset maintenance',
      'Personal accident insurance up to ₹2 lakhs',
      'No collateral required for loans up to ₹1.6 lakhs'
    ],
    applicationProcess: 'Apply through your nearest bank branch, online banking portal, or through agriculture department officers',
    documents: [
      'Identity Proof (Aadhaar/Voter ID)',
      'Address Proof',
      'Land Records/Tenancy Certificate',
      'Passport Size Photographs',
      'Bank Account Details'
    ],
    websiteUrl: 'https://www.nabard.org/content.aspx?id=488'
  },
  {
    id: 'pkvy',
    name: 'Paramparagat Krishi Vikas Yojana',
    description: 'Promotes organic farming with cluster-based certification approach and marketing support',
    eligibilityCriteria: {
      minLandSize: 0.5
    },
    benefits: [
      'Financial assistance of ₹50,000 per hectare over three years',
      'Dedicated training on organic farming practices',
      'Free organic certification under PGS-India',
      'Marketing assistance and brand building for organic products',
      'Additional 10% premium on organic produce'
    ],
    applicationProcess: 'Apply through your district agriculture office or connect with local Farmer Producer Organizations',
    documents: [
      'Land Records',
      'Bank Account Details',
      'Farmer ID or Aadhaar',
      'Soil Test Reports (if available)',
      'Declaration of no chemical use for last 3 months'
    ],
    websiteUrl: 'https://pgsindia-ncof.gov.in/pkvy/index.aspx'
  },
  {
    id: 'nmsa',
    name: 'National Mission for Sustainable Agriculture',
    description: 'Comprehensive program to promote climate-resilient agricultural practices',
    eligibilityCriteria: {
      minLandSize: 0.2
    },
    benefits: [
      'Subsidy up to 50% for water conservation structures',
      'Free soil health cards and testing',
      'Assistance for micro-irrigation systems',
      'Support for climate-resilient crop varieties',
      'Training on climate adaptation techniques'
    ],
    applicationProcess: 'Apply through your district agriculture office or NMSA portal',
    documents: [
      'Land Records',
      'Bank Account Details',
      'Aadhaar Card',
      'Soil Health Card (if available)',
      'Farm Plan'
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
    websiteUrl: 'https://play.google.com/store/search?q=Uzhavan%20App&c=apps'
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
    websiteUrl: 'https://tnau.ac.in/'
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
    websiteUrl: 'https://tnagrisnet.tn.gov.in/'
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
    websiteUrl: 'https://dahd.gov.in/'
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