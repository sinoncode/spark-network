import { motion } from 'framer-motion';
import {
  ChevronRight,
  Home
} from 'lucide-react';





import { ClientHero } from '../../../../components/client/ClientHero';
import { SummaryCards } from '../../../../components/client/SummaryCards';
import { ClientInformation } from '../../../../components/client/ClientInformation';
import { PropertyRequirements } from '../../../../components/client/PropertyRequirements';
import { FinancialOverview } from '../../../../components/client/FinancialOverview';
import { DocumentsSection } from '../../../../components/client/DocumentsSection';
import { AgentSidebar } from '../../../../components/client/AgentSidebar';
import { LeadStatusCard } from '../../../../components/client/LeadStatusCard';
import { Timeline } from '../../../../components/client/Timeline';
import { Notes } from '../../../../components/client/Notes';
import { QuickActions } from '../../../../components/client/QuickActions';

import {
  mockClient,
  mockDocuments,
  mockFinancialOverview,
  mockNotes,
  mockPropertyRequirements,
  mockTimelineEvents
} from '../../../../components/client/data/mockData';

export default function CharacteristicsStep() {
  const summaryData = {
    budget: mockPropertyRequirements.budgetRange.split(' - ')[1] || 'CHF 2.5M',
    ownCapital: mockFinancialOverview.ownCapital,
    mortgage: mockFinancialOverview.mortgage.split(' ')[0],
    documents: '24 / 31', // Mock data
    leadScore: `${mockClient.score}%`,
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium"
        >
          <Home className="w-4 h-4 mr-2" />
          <span className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors">Clients</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-zinc-900 dark:text-zinc-100">{mockClient.name}</span>
        </motion.div>

        {/* Hero Section */}
        <ClientHero client={mockClient} />

        {/* Summary Cards */}
        <SummaryCards data={summaryData} />

        {/* Main Grid: 70% Left / 30% Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (70%) */}
          <div className="lg:col-span-8 space-y-8">
            <ClientInformation client={mockClient} />
            {/* <PropertyRequirements requirements={mockPropertyRequirements} /> */}
            <FinancialOverview financials={mockFinancialOverview} />
            <DocumentsSection categories={mockDocuments} />

            {/* Mobile/Tablet Notes - hidden on desktop since it might be better on right, or keep it left? 
                Prompt says: "LEFT: Client Information, Property Requirements, Financial Overview, Documents, Notes"
                So Notes goes to LEFT.
            */}
            <Notes notes={mockNotes} />
          </div>

          {/* Right Column (30%) - Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <AgentSidebar agent={mockClient.assignedAgent} />
            <LeadStatusCard currentStatus={mockClient.status} />
            <Timeline events={mockTimelineEvents} />
            <QuickActions />
          </div>

        </div>
      </div>
    </div>
  );
}