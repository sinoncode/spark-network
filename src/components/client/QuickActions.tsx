import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, UserPlus, FileText, Download, Calendar, Mail, XCircle, Archive, Zap } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { label: 'Approve Client', icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40' },
    { label: 'Assign Agent', icon: UserPlus, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40' },
    { label: 'Generate PDF', icon: FileText, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40' },
    { label: 'Download All', icon: Download, color: 'text-zinc-600 dark:text-zinc-400', bg: 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700' },
    { label: 'Schedule Meeting', icon: Calendar, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40' },
    { label: 'Send Email', icon: Mail, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40' },
  ];

  const dangerActions = [
    { label: 'Reject Client', icon: XCircle },
    { label: 'Archive Client', icon: Archive },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-6">
        <CardHeader className="pb-4 pt-6 px-6">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className={`h-auto flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all ${action.bg}`}
              >
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className={`text-xs font-medium ${action.color}`}>{action.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {dangerActions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="flex-1 rounded-xl border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
