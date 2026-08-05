import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DocumentCategory as DocumentCategoryType } from './data/types';
import { DocumentCard } from './DocumentCard';
import { FolderOpen, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DocumentsSectionProps {
  categories: DocumentCategoryType[];
}

export function DocumentsSection({ categories }: DocumentsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-3xl" />
        <CardHeader className="pb-4 pt-6 px-8 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-amber-500" />
            Documents
          </CardTitle>
          {/* <Button variant="outline" className="rounded-xl border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40">
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload File
          </Button> */}
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <Accordion type="multiple" defaultValue={[categories[0]?.id]} className="space-y-4">
            {categories.map((category) => (
              <AccordionItem value={category.id} key={category.id} className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/50 overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{category.title}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {category.completion}%
                      </span>
                      <div className="w-32 hidden md:block">
                        <Progress value={category.completion} className="h-2 bg-zinc-100 dark:bg-zinc-800" />
                      </div>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {category.documents.length} Files
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  {category.documents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                      {category.documents.map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-zinc-500 dark:text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl mt-4 bg-zinc-50 dark:bg-zinc-900/50">
                      <FolderOpen className="w-12 h-12 mb-3 text-zinc-300 dark:text-zinc-600" />
                      <p>No documents uploaded yet.</p>
                      <Button variant="link" className="text-amber-600 dark:text-amber-400">
                        Upload now
                      </Button>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}
