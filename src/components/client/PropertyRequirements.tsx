import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PropertyRequirements as PropertyRequirementsType } from './data/types';
import { Home, BedDouble, Bath, Maximize, Map, Car, ArrowUpCircle, Sun, TreePine, Mountain, Waves, Train, GraduationCap } from 'lucide-react';

interface PropertyRequirementsProps {
  requirements: PropertyRequirementsType;
}

export function PropertyRequirements({ requirements }: PropertyRequirementsProps) {
  const requirementRows = [
    { label: 'Budget Range', value: requirements.budgetRange, icon: Home },
    { label: 'Bedrooms', value: requirements.bedrooms, icon: BedDouble },
    { label: 'Bathrooms', value: requirements.bathrooms, icon: Bath },
    { label: 'Living Area', value: requirements.livingArea, icon: Maximize },
    { label: 'Land Area', value: requirements.landArea, icon: Map },
    { label: 'Parking', value: requirements.parking, icon: Car },
    { label: 'Floor', value: requirements.floor, icon: ArrowUpCircle },
    { label: 'Balcony', value: requirements.balcony, icon: Sun },
    { label: 'Terrace', value: requirements.terrace, icon: TreePine },
    { label: 'Garden', value: requirements.garden, icon: Mountain },
    { label: 'Pool', value: requirements.pool, icon: Waves },
    { label: 'Lake View', value: requirements.lakeView, icon: Waves },
    { label: 'School Distance', value: requirements.schoolDistance, icon: GraduationCap },
    { label: 'Train Distance', value: requirements.trainDistance, icon: Train },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-3xl" />
        <CardHeader className="pb-4 pt-6 px-8">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Home className="w-5 h-5 text-indigo-500" />
            Property Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {requirementRows.map((row, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <row.icon className="w-4 h-4 text-indigo-400" />
                  {row.label}
                </div>
                <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {row.value}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">Required Features</h4>
            <div className="flex flex-wrap gap-2">
              {requirements.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge variant="secondary" className="px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800/50 shadow-sm text-sm">
                    {feature}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
