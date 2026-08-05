import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialOverview as FinancialOverviewType } from './data/types';
import { Landmark, TrendingUp, Building, CreditCard, Banknote, ShieldCheck, Wallet, PieChart, Briefcase, FileSignature, Receipt } from 'lucide-react';

interface FinancialOverviewProps {
  financials: FinancialOverviewType;
}

export function FinancialOverview({ financials }: FinancialOverviewProps) {
  const financialCards = [
    { label: 'Own Capital', value: financials.ownCapital, icon: Wallet, color: 'text-emerald-500' },
    { label: 'Income', value: financials.income, icon: Banknote, color: 'text-emerald-500' },
    { label: 'Mortgage', value: financials.mortgage, icon: Building, color: 'text-blue-500' },
    { label: 'Debt Ratio', value: financials.debtRatio, icon: PieChart, color: 'text-orange-500' },
    { label: 'Swiss Bank', value: financials.swissBank, icon: Landmark, color: 'text-red-500' },
    { label: 'Mortgage Status', value: financials.mortgageStatus, icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'Down Payment', value: financials.downPayment, icon: CreditCard, color: 'text-purple-500' },
    { label: 'Pre-Approval', value: financials.preApproval, icon: FileSignature, color: 'text-blue-500' },
    { label: 'Assets', value: financials.assets, icon: Briefcase, color: 'text-indigo-500' },
    { label: 'Investment Portfolio', value: financials.investmentPortfolio, icon: TrendingUp, color: 'text-teal-500' },
    { label: 'Tax Status', value: financials.taxStatus, icon: Receipt, color: 'text-slate-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-3xl" />
        <CardHeader className="pb-4 pt-6 px-8">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-500" />
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {financialCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-zinc-800/80 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-700 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 ${card.color}`}>
                    <card.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {card.label}
                  </span>
                </div>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {card.value}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
