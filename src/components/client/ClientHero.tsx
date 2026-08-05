import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClientProfile } from './data/types';
import { CheckCircle2, UserPlus, FileText, Download, Archive, MoreHorizontal } from 'lucide-react';

interface ClientHeroProps {
  client: ClientProfile;
}

export function ClientHero({ client }: ClientHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-3xl bg-white/60 dark:bg-zinc-900/60 p-8 shadow-sm backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 mb-8"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-[linear-gradient(90deg,_#1f6ea9_0%,_#155789_40%,_#0a2f4f_70%,_#040404_100%)]
          shadow-[rgba(18, 26, 133, 0.36)_0px_7px_29px_0px] rounded-t-3xl -z-10" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-md"
          >
            <img src={client.avatar} alt={client.name} className="h-full w-full object-cover" />
          </motion.div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{client.name}</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200">
                {client.type}
              </Badge>
              <Badge variant="outline" className="text-emerald-600 border-emerald-200 dark:border-emerald-800/30 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10">
                {client.status}
              </Badge>
              <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20">
                {client.priority}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-white dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-white dark:text-zinc-300">ID:</span> {client.id}
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-white dark:text-zinc-300">Nationality:</span> {client.nationality}
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-white dark:text-zinc-300">Score:</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold ring-2 ring-emerald-500/20">
                  {client.score}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Button variant="default" className="rounded-xl shadow-sm bg-blue-600 hover:bg-blue-700 text-white flex gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4" />
            Approve
          </Button>
          <Button variant="outline" className="rounded-xl flex gap-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
            <UserPlus className="w-4 h-4" />
            Assign Agent
          </Button>
          <Button variant="outline" className="rounded-xl flex gap-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
            <FileText className="w-4 h-4" />
            Generate PDF
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-500">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-500">
            <Archive className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-500">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div> */}
      </div>
    </motion.div>
  );
}
