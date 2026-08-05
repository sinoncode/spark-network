export interface ClientProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  priority: string;
  nationality: string;
  residencePermit: string;
  civilStatus: string;
  language: string;
  leadSource: string;
  score: number;
  created: string;
  updated: string;
  lastContact: string;
  assignedAgent: Agent;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
  phone: string;
  propertiesManaged: number;
  clientsManaged: number;
  rating: number;
  responseTime: string;
}

export interface PropertyRequirements {
  budgetRange: string;
  bedrooms: string;
  bathrooms: string;
  livingArea: string;
  landArea: string;
  parking: string;
  floor: string;
  balcony: string;
  terrace: string;
  garden: string;
  pool: string;
  lakeView: string;
  elevator: string;
  schoolDistance: string;
  trainDistance: string;
  features: string[];
}

export interface FinancialOverview {
  ownCapital: string;
  income: string;
  mortgage: string;
  debtRatio: string;
  swissBank: string;
  mortgageStatus: string;
  downPayment: string;
  preApproval: string;
  assets: string;
  investmentPortfolio: string;
  taxStatus: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  uploadedDate: string;
  size: string;
  uploadedBy: string;
  verifiedBy?: string;
}

export interface DocumentCategory {
  id: string;
  title: string;
  completion: number;
  documents: Document[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  iconType: string;
  subtitle?: string;
}

export interface Note {
  id: string;
  content: string;
  author: string;
  date: string;
  pinned?: boolean;
}
