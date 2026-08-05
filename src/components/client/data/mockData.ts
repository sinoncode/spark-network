import { Agent, ClientProfile, DocumentCategory, FinancialOverview, Note, PropertyRequirements, TimelineEvent } from './types';

export const mockAgent: Agent = {
  id: 'ag-1',
  name: 'Sarah Jenkins',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  role: 'Senior Real Estate Agent',
  email: 'sarah.jenkins@swissreal.ch',
  phone: '+41 79 123 45 67',
  propertiesManaged: 12,
  clientsManaged: 45,
  rating: 4.9,
  responseTime: '< 1 hour',
};

export const mockClient: ClientProfile = {
  id: 'LD-10294',
  name: 'John Smith',
  avatar: 'https://i.pravatar.cc/150?u=john',
  email: 'john.smith@example.com',
  phone: '+41 78 987 65 43',
  type: 'Buyer',
  status: 'Qualified',
  priority: 'High Priority',
  nationality: 'British',
  residencePermit: 'B Permit',
  civilStatus: 'Married',
  language: 'English, French',
  leadSource: 'Referral',
  score: 92,
  created: '10 Jan 2026',
  updated: '24 Jun 2026',
  lastContact: '2 Hours Ago',
  assignedAgent: mockAgent,
};

export const mockPropertyRequirements: PropertyRequirements = {
  budgetRange: 'CHF 2.0M - 2.5M',
  bedrooms: '3+',
  bathrooms: '2+',
  livingArea: '150m²+',
  landArea: '500m²+',
  parking: '2+',
  floor: 'Any',
  balcony: 'Required',
  terrace: 'Preferred',
  garden: 'Required',
  pool: 'Nice to have',
  lakeView: 'Required',
  elevator: 'Not necessary',
  schoolDistance: '< 5km',
  trainDistance: '< 2km',
  features: ['Villa', 'Garden', 'Lake View', 'Pool', 'Terrace', 'Parking', 'Smart Home', 'Near Schools', 'Near Lake', 'Modern', 'Luxury'],
};

export const mockFinancialOverview: FinancialOverview = {
  ownCapital: 'CHF 850,000',
  income: 'CHF 240,000 / year',
  mortgage: 'Approved (CHF 1.65M)',
  debtRatio: '28%',
  swissBank: 'UBS Switzerland AG',
  mortgageStatus: 'Pre-Approved',
  downPayment: '20% Ready',
  preApproval: 'Valid until Dec 2026',
  assets: 'CHF 1.2M',
  investmentPortfolio: 'Medium Risk',
  taxStatus: 'Regular (Vaud)',
};

export const mockDocuments: DocumentCategory[] = [
  {
    id: 'cat-1',
    title: 'Personal & Legal Documentation',
    completion: 100,
    documents: [
      { id: 'doc-1', name: 'Passport.pdf', type: 'PDF', status: 'Verified', uploadedDate: '15 Jan 2026', size: '2.4 MB', uploadedBy: 'John Smith', verifiedBy: 'Admin' },
      { id: 'doc-2', name: 'Residence_Permit.pdf', type: 'PDF', status: 'Verified', uploadedDate: '15 Jan 2026', size: '1.1 MB', uploadedBy: 'John Smith', verifiedBy: 'Admin' },
      { id: 'doc-3', name: 'Marriage_Certificate.pdf', type: 'PDF', status: 'Verified', uploadedDate: '16 Jan 2026', size: '1.8 MB', uploadedBy: 'John Smith', verifiedBy: 'Admin' },
    ],
  },
  {
    id: 'cat-2',
    title: 'Financial Documents',
    completion: 85,
    documents: [
      { id: 'doc-4', name: 'Proof_of_Funds.pdf', type: 'PDF', status: 'Verified', uploadedDate: '18 Jan 2026', size: '3.2 MB', uploadedBy: 'John Smith', verifiedBy: 'Sarah Jenkins' },
      { id: 'doc-5', name: 'Tax_Declaration_2025.pdf', type: 'PDF', status: 'Verified', uploadedDate: '20 Jan 2026', size: '4.5 MB', uploadedBy: 'John Smith', verifiedBy: 'Sarah Jenkins' },
      { id: 'doc-6', name: 'Employment_Contract.pdf', type: 'PDF', status: 'Pending', uploadedDate: '22 Jan 2026', size: '1.2 MB', uploadedBy: 'John Smith' },
    ],
  },
  {
    id: 'cat-3',
    title: 'Property Documents',
    completion: 0,
    documents: [],
  },
];

export const mockTimelineEvents: TimelineEvent[] = [
  { id: 'tl-1', title: 'Documents Verified', date: 'Today', time: '10:30 AM', iconType: 'check', subtitle: 'All personal documents approved.' },
  { id: 'tl-2', title: 'Mortgage Approved', date: 'Yesterday', time: '14:15 PM', iconType: 'file-text', subtitle: 'Pre-approval from UBS confirmed.' },
  { id: 'tl-3', title: 'Passport Uploaded', date: '2 Days Ago', time: '09:00 AM', iconType: 'upload', subtitle: 'Uploaded by John Smith' },
  { id: 'tl-4', title: 'Lead Created', date: '5 Days Ago', time: '11:20 AM', iconType: 'user-plus', subtitle: 'Imported from Referral.' },
];

export const mockNotes: Note[] = [
  { id: 'nt-1', content: 'Client is highly motivated to close before September. Prefers properties in the Vaud region with direct lake access. Needs a large garden for two dogs.', author: 'Sarah Jenkins', date: 'Yesterday at 15:45', pinned: true },
  { id: 'nt-2', content: 'Requested an additional viewing for the Montreux property. Waiting for the seller to confirm availability.', author: 'Sarah Jenkins', date: '3 Days Ago at 09:12' },
];
