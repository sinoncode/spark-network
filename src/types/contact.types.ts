// ==========================================
// 1. ENUMS & UNION TYPES
// ==========================================
export type ClientRole =
  | "buyer"
  | "seller"
  | "tenant"
  | "landlord"
  | "investor"
  | "owner_occupier"
  | "co_owner"
  | "heir_estate"
  | "power_of_attorney"
  | "other";

export type ClientSubtype =
  | "private_individual"
  | "company_corporate"
  | "trust_foundation"
  | "fund_institutional"
  | "government_municipality";

export type ClientCategory =
  | "standard"
  | "vip"
  | "ultra_hnw"
  | "institutional"
  | "social_housing"
  | "developer";

export type RelationshipStage =
  | "prospect"
  | "active"
  | "recurring"
  | "former"
  | "dormant"
  | "referrer_only";

export type PriorityLevel = "urgent" | "high" | "normal" | "low";

export type SwissPermitType =
  | "B"
  | "C"
  | "G"
  | "L"
  | "F"
  | "S"
  | "N"
  | "none";

// ==========================================
// 2. DOMAIN / FORM DATA INTERFACES
// ==========================================
export interface BaseContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
}

export interface ClientClassificationFormState {
  clientRoles: ClientRole[];
  clientSubtype: ClientSubtype;
  clientCategory: ClientCategory;
  relationshipStage: RelationshipStage;
  priorityLevel: PriorityLevel;
  isReferred: boolean;
  referredByContactId: string;
  exclusivityWithAgency: boolean;
  signedAgencyAgreement: boolean;
  agencyAgreementDate: string;
  agencyAgreementFile: File | null;
  hasPowerOfAttorney: boolean;
  poaHolderName: string;
  poaDocumentFile: File | null;
  companyName: string;
  companyRegistrationNo: string;
  vatUidNumber: string;
  legalRepresentativeName: string;
  legalRepresentativeContactId: string;
  fiscalDomicileCountry: string;
  isResidentInSwitzerland: boolean;
  swissResidencePermitType: SwissPermitType;
  lexKollerRestriction: boolean;
}

export interface ContactFormData extends BaseContactInfo, ClientClassificationFormState {
  title: string;
  leadType: string;
  listingType: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  area: string;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  balconies: number | undefined;
  floor: string;
  totalFloors: string;
  yearBuilt: string;
  furnishing: string;
  facing: string;
  coveredParking: boolean;
  openParking: boolean;
  parkingSlots: string;
  amenities: string[];
  images: string[];
  publicationStatus: string;
  keywords: string[];
  country: string;
  community: string;
  subCommunity: string;
  buildingName: string;
  locationDescription: string;
  builtUpArea: string;
  plotArea: string;
  leadAge: string;
  floorNumber: string;
  elevators: string;
  ownershipType: string;
  visitorParking: string;
  price: string;
  pricePerSqft: string;
  maintenanceFee: string;
  securityDeposit: string;
  roi: string;
  rentalYield: string;
  marketValue: string;
  visibility: string;
  isFeatured: boolean;
  priority: string;
  assignedAgent: string;
  publishDate: string;
  expiryDate: string;
  isVerified: boolean;
  requiresApproval: boolean;
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string;
  assignedAgentId: string;
  secondaryAgentId: string;
  referredById: string;
  spousePartnerId: string;
  familyMemberIds: string[];
  legalRepresentativeId: string;
  notaryId: string;
  mortgageBrokerBankId: string;
  notes: string;
  budgetCurrency: string;
  budgetFlexibility: string;
  budgetMin: number | undefined;
  budgetMax: number | undefined;
  monthlyRentalBudget: number | undefined;
  investmentReturnTarget: number | undefined;
  financingMethod: string;
  equityAvailable: number | undefined;
  mortgageAmountRequired: number | undefined;
  mortgagePreApprovalStatus: string;
  mortgageAdvisorContactId: string;
  preApprovalBank: string;
  preApprovalAmount: number | undefined;
  preApprovalExpiryDate: string;
  netWorthIndication: string;
  sourceOfFunds: string;
  amlKycStatus: string;
  amlRiskRating: string;
  amlVerificationDate: string;
  amlVerificationMethod: string;
  isPepDeclared: boolean;
  pepDetails: string;
  idDocumentType: string;
  idDocumentNumber: string;
  idExpiryDate: string;
  transactionTypeSought: string;
  propertyCategories: string[];
  propertySubTypes: string[];
  preferredCountries: string[];
  preferredCantons: string[];
  preferredCities: string[];
  preferredNeighbourhoods: string[];
  referenceLocation: string;
  radiusKm: number | undefined;
  minLivingArea: number | undefined;
  maxLivingArea: number | undefined;
  minLandArea: number | undefined;
  minRooms: string;
  minBedrooms: string;
  minBathrooms: string;
  parkingRequirement: string;
  minParkingSpaces: number | undefined;
  gardenRequirement: string;
  terraceBalconyRequirement: string;
  viewPreference: string;
  orientationPreference: string;
  floorPreference: string;
  furnished: string;
  minYearBuilt: number | undefined;
  maxYearBuilt: number | undefined;
  maxRenovationNeeded: string;
  minEnergyClass: string;
  heatingSystemPreference: string;
  evChargingRequired: string;
  homeOfficeRequired: string;
  elevatorRequired: string;
  maxMonthlyCharges: number | undefined;
  desiredMoveInDate: string;
  matchingAlertActive: boolean;
  alertFrequency: string;
  alertDeliveryChannels: string[];
  isOwnerVendor: boolean;
  linkedPropertyIds: string[];
  estimatedValueProperty: number | undefined;
  agencyValuation: number | undefined;
  valuationDate: string;
  mandateTypeSought: string;
  reasonForSellingRenting: string;
  urgencyToSellRent: string;
  competingAgencies: string;
  reasonOtherDetails: string;
  hasMortgageOutstanding: boolean;
  mortgageOutstandingAmount: number | undefined;
  minimumNetPriceConfidential: number | undefined;
  renovationPlannedBeforeSale: boolean;
  renovationBudget: number | undefined;
  linkedPropertiesBuyerTenant: string[];
  linkedPropertiesSellerLandlord: string[];
  linkedTransactionsDossierIds: string[];
  linkedOfferIds: string[];
  linkedViewingIds: string[];
  linkedInvoiceCommissionIds: string[];
  totalEmailsSentReceived: number | undefined;
  totalAlertsSent: number | undefined;
  newsletterCampaignsSent: number | undefined;
  eventsAttended: string[];
  socialMediaNotes: string;
}

// ==========================================
// 3. ZUSTAND STORE INTERFACE
// ==========================================
export interface ContactStore {
  form: ContactFormData;
  updateField: <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => void;
  setForm: (data: Partial<ContactFormData>) => void;
  reset: () => void;
}
