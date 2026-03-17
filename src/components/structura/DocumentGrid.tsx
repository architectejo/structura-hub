import { Document } from '@/types/structura';
import { StatusBadge } from './StatusBadge';
import { Lock, Globe, FileText } from 'lucide-react';

interface Props {
  documents: Document[];
}

export function DocumentGrid({ documents }: Props) {
  if (documents.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-12">
        Aucun document dans cette vue.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {documents.map((doc) => (
        <div key={doc.id} className="structura-card p-4 space-y-3 transition-shadow hover:shadow-md group">
          <div className="flex items-start justify-between">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <div className="flex items-center gap-1">
              {doc.is_private && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
              {doc.is_public_api && <Globe className="h-3.5 w-3.5 text-status-verified" />}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium leading-tight">{doc.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{doc.bureau}</p>
          </div>
          <div className="flex items-center justify-between">
            <StatusBadge status={doc.status} />
            <span className="font-mono text-[10px] text-muted-foreground">{doc.date_creation}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
