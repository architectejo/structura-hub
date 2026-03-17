import { Document } from '@/types/structura';
import { StatusBadge } from './StatusBadge';
import { RotateCcw, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

function getDaysRemaining(deletedAt: string): number {
  const deleted = new Date(deletedAt);
  const deadline = new Date(deleted.getTime() + 30 * 24 * 60 * 60 * 1000);
  const now = new Date();
  return Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

function getCountdownColor(days: number): string {
  if (days <= 5) return 'text-status-rejected-foreground';
  if (days <= 15) return 'text-status-local-foreground';
  return 'text-muted-foreground';
}

export function TrashTable({ documents }: { documents: Document[] }) {
  const trashed = documents.filter((d) => d.is_deleted && d.deleted_at);

  return (
    <div className="structura-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="metadata-label">Réf.</TableHead>
            <TableHead className="metadata-label">Document</TableHead>
            <TableHead className="metadata-label">Statut</TableHead>
            <TableHead className="metadata-label">Supprimé le</TableHead>
            <TableHead className="metadata-label">Auto-effacement</TableHead>
            <TableHead className="metadata-label text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trashed.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-12">
                La corbeille est vide.
              </TableCell>
            </TableRow>
          ) : (
            trashed.map((doc) => {
              const days = getDaysRemaining(doc.deleted_at!);
              return (
                <TableRow key={doc.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{doc.id}</TableCell>
                  <TableCell className="text-sm font-medium">{doc.name}</TableCell>
                  <TableCell><StatusBadge status={doc.status} /></TableCell>
                  <TableCell className="font-mono text-xs">{doc.deleted_at}</TableCell>
                  <TableCell>
                    <span className={cn('font-mono text-xs font-semibold tabular-nums', getCountdownColor(days))}>
                      Rétention : {days} jour{days !== 1 ? 's' : ''} restant{days !== 1 ? 's' : ''}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs gap-1">
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restaurer
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
