import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Document } from './data/types';
import { FileText, Download, Eye, CheckCircle2, Clock, XCircle, History } from 'lucide-react';

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const isVerified = document.status === 'Verified';
  const isPending = document.status === 'Pending';
  const isRejected = document.status === 'Rejected';

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group relative overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:shadow-xl dark:hover:shadow-zinc-900/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300">
        <div className={`absolute top-0 left-0 w-full h-1 ${
          isVerified ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-red-500'
        }`} />
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${
              isVerified ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 
              isPending ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' : 
              'bg-red-50 text-red-600 dark:bg-red-900/20'
            }`}>
              <FileText className="w-6 h-6" />
            </div>
            <Badge variant="outline" className={`
              ${isVerified ? 'border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400' : 
              isPending ? 'border-amber-200 text-amber-600 dark:border-amber-800 dark:text-amber-400' : 
              'border-red-200 text-red-600 dark:border-red-800 dark:text-red-400'}
            `}>
              {isVerified && <CheckCircle2 className="w-3 h-3 mr-1" />}
              {isPending && <Clock className="w-3 h-3 mr-1" />}
              {isRejected && <XCircle className="w-3 h-3 mr-1" />}
              {document.status}
            </Badge>
          </div>

          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1 truncate" title={document.name}>
            {document.name}
          </h4>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mb-4">
            <span>{document.type}</span>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span>{document.size}</span>
          </div>

          <div className="space-y-2 mb-5 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>Uploaded</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{document.uploadedDate}</span>
            </div>
            <div className="flex justify-between">
              <span>By</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{document.uploadedBy}</span>
            </div>
            {document.verifiedBy && (
              <div className="flex justify-between">
                <span>Verified By</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{document.verifiedBy}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="secondary" size="sm" className="w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg">
              <Eye className="w-4 h-4 mr-1.5" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="w-10 px-0 rounded-lg border-zinc-200 dark:border-zinc-700">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="w-10 px-0 rounded-lg border-zinc-200 dark:border-zinc-700" title="Version History">
              <History className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
