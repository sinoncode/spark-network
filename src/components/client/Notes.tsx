import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Note } from './data/types';
import { StickyNote, Pin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotesProps {
  notes: Note[];
}

export function Notes({ notes }: NotesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="rounded-3xl border-0 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl mb-6">
        <CardHeader className="pb-4 pt-6 px-6 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-yellow-500" />
            Internal Notes
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
            <Plus className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-4">
            {notes.map((note, idx) => (
              <motion.div
                key={note.id}
                whileHover={{ y: -2 }}
                className={`p-4 rounded-2xl relative overflow-hidden ${
                  note.pinned 
                    ? 'bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30' 
                    : 'bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800'
                }`}
              >
                {note.pinned && (
                  <Pin className="absolute top-3 right-3 w-4 h-4 text-yellow-600 dark:text-yellow-500 transform rotate-45" />
                )}
                <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 leading-relaxed pr-6">
                  {note.content}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    {note.author}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {note.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
