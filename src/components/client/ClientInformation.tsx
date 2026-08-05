import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientProfile } from './data/types';
import { User, Mail, Phone, Globe, MapPin, Heart, MessageSquare, Briefcase, Tag, Target, Calendar, Clock } from 'lucide-react';

interface ClientInformationProps {
  client: ClientProfile;
}

export function ClientInformation({ client }: ClientInformationProps) {
  const infoRows = [
    { label: 'Name', value: client.name, icon: User },
    { label: 'Email', value: client.email, icon: Mail },
    { label: 'Phone', value: client.phone, icon: Phone },
    { label: 'Nationality', value: client.nationality, icon: Globe },
    { label: 'Residence Permit', value: client.residencePermit, icon: MapPin },
    { label: 'Civil Status', value: client.civilStatus, icon: Heart },
    { label: 'Language', value: client.language, icon: MessageSquare },
    { label: 'Client Type', value: client.type, icon: Briefcase },
    { label: 'Lead Status', value: client.status, icon: Tag },
    { label: 'Lead Source', value: client.leadSource, icon: Target },
    { label: 'Created', value: client.created, icon: Calendar },
    { label: 'Updated', value: client.updated, icon: Clock },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-3xl" />
        <CardHeader className="pb-4 pt-6 px-8">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            {infoRows.map((row, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <row.icon className="w-4 h-4" />
                  {row.label}
                </div>
                <div className="text-base font-medium text-zinc-900 dark:text-zinc-100 pl-6">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
