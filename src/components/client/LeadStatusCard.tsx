import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Check } from 'lucide-react';

interface LeadStatusCardProps {
  currentStatus: string;
}

export function LeadStatusCard({ currentStatus }: LeadStatusCardProps) {
  const stages = [
    'Inquiry',
    'Qualified',
    'Viewing',
    'Offer',
    'Mortgage',
    'Completed'
  ];

  const currentIndex = stages.indexOf(currentStatus);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-6">
        <CardHeader className="pb-4 pt-6 px-6">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Lead Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="relative">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-zinc-100 dark:bg-zinc-800" />
            
            <div className="space-y-4">
              {stages.map((stage, idx) => {
                const isCompleted = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                const isPending = idx > currentIndex;

                return (
                  <div key={stage} className="relative flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-blue-500 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {isCompleted && <Check className="w-3.5 h-3.5" />}
                      {isCurrent && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                    </motion.div>
                    
                    <div className={`flex-1 ${isCurrent ? 'font-bold text-blue-600 dark:text-blue-400' : isCompleted ? 'font-medium text-zinc-700 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-600'}`}>
                      {stage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
