import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Agent } from './data/types';
import { Star, Home, Users, Clock, Mail, Phone, ExternalLink } from 'lucide-react';

interface AgentSidebarProps {
  agent: Agent;
}

export function AgentSidebar({ agent }: AgentSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-6 overflow-hidden">
        <div className="h-16 bg-[linear-gradient(90deg,_#1f6ea9_0%,_#155789_40%,_#0a2f4f_70%,_#040404_100%)] w-full" />
        <CardContent className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col items-center -mt-10 mb-4">
            <div className="h-20 w-20 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden shadow-md bg-zinc-100 dark:bg-zinc-800">
              <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">{agent.name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{agent.role}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-emerald-500 font-bold mb-1">
                <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                {agent.rating}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Rating</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-blue-500 font-bold mb-1">
                <Clock className="w-4 h-4" />
                {agent.responseTime}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Response</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-purple-500 font-bold mb-1">
                <Home className="w-4 h-4" />
                {agent.propertiesManaged}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Properties</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-orange-500 font-bold mb-1">
                <Users className="w-4 h-4" />
                {agent.clientsManaged}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Clients</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              {agent.email}
            </a>
            <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              {agent.phone}
            </a>
          </div>

          <Button className="w-full rounded-xl bg-primary hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 transition-all shadow-sm">
            View Profile <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
