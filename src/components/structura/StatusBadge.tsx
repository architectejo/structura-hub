import { DocumentStatus } from '@/types/structura';
import { cn } from '@/lib/utils';

const statusConfig: Record<DocumentStatus, { label: string; className: string }> = {
  brouillon: { label: 'Brouillon', className: 'bg-status-draft text-status-draft-foreground' },
  verifie: { label: 'Vérifié', className: 'bg-status-verified/15 text-status-verified-foreground' },
  valide: { label: 'Validé', className: 'bg-status-validated/15 text-status-validated-foreground' },
  rejete: { label: 'Rejeté', className: 'bg-status-rejected/15 text-status-rejected-foreground' },
};

export function StatusBadge({ status }: { status: DocumentStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn('status-badge', config.className)}>
      {config.label}
    </span>
  );
}
