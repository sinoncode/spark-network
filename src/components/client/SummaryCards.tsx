import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Landmark, FileText, Activity, Home } from 'lucide-react';

interface SummaryCardsProps {
  data: {
    budget: string;
    ownCapital: string;
    mortgage: string;
    documents: string;
    leadScore: string;
  };
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Budget',
      value: data.budget,
      icon: Wallet,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'group-hover:border-blue-200 dark:group-hover:border-blue-800',
    },
    {
      title: 'Own Capital',
      value: data.ownCapital,
      icon: Landmark,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      border: 'group-hover:border-indigo-200 dark:group-hover:border-indigo-800',
    },
    {
      title: 'Mortgage',
      value: data.mortgage,
      icon: Home,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'group-hover:border-purple-200 dark:group-hover:border-purple-800',
    },
    {
      title: 'Documents',
      value: data.documents,
      icon: FileText,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'group-hover:border-amber-200 dark:group-hover:border-amber-800',
    },
    {
      title: 'Lead Score',
      value: data.leadScore,
      icon: Activity,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-800',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
    >
      {cards.map((card, idx) => (
        <motion.div key={idx} variants={item}>
          <Card className={`group relative overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-zinc-900/50 ${card.border}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${card.bg}`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {card.value}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
