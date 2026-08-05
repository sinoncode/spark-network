import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimelineEvent } from './data/types';
import { History, CheckCircle2, FileText, Upload, UserPlus } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'check': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'file-text': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'upload': return <Upload className="w-4 h-4 text-amber-500" />;
      case 'user-plus': return <UserPlus className="w-4 h-4 text-purple-500" />;
      default: return <History className="w-4 h-4 text-zinc-500" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'check': return 'bg-emerald-100 dark:bg-emerald-900/30 ring-emerald-50 dark:ring-emerald-900/10';
      case 'file-text': return 'bg-blue-100 dark:bg-blue-900/30 ring-blue-50 dark:ring-blue-900/10';
      case 'upload': return 'bg-amber-100 dark:bg-amber-900/30 ring-amber-50 dark:ring-amber-900/10';
      case 'user-plus': return 'bg-purple-100 dark:bg-purple-900/30 ring-purple-50 dark:ring-purple-900/10';
      default: return 'bg-zinc-100 dark:bg-zinc-800 ring-zinc-50 dark:ring-zinc-800/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-6">
        <CardHeader className="pb-4 pt-6 px-6">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="relative border-l-2 border-zinc-100 dark:border-zinc-800 ml-3 space-y-6">
            {events.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) }}
                className="relative pl-6"
              >
                <div className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center ring-4 ${getIconBg(event.iconType)}`}>
                  {getIcon(event.iconType)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight mb-1">
                    {event.title}
                  </h4>
                  {event.subtitle && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                      {event.subtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    <span>{event.date}</span>
                    {event.time && (
                      <>
                        <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span>{event.time}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
