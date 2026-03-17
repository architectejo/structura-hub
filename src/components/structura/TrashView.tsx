import { TrashTable } from './TrashTable';
import { mockDocuments } from '@/data/mock-data';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export function TrashView() {
  const trashedCount = mockDocuments.filter((d) => d.is_deleted).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div>
        <div className="flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold tracking-tight">Corbeille</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {trashedCount} document{trashedCount !== 1 ? 's' : ''} en rétention — Suppression automatique après 30 jours.
        </p>
      </div>
      <TrashTable documents={mockDocuments} />
    </motion.div>
  );
}
