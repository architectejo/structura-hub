import { Document } from '@/types/structura';
import { StatusBadge } from './StatusBadge';
import { ShareModal } from './ShareModal';
import { useStructura } from '@/contexts/StructuraContext';
import { Lock, Eye, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  documents: Document[];
  onVerify?: (doc: Document) => void;
  onValidate?: (doc: Document) => void;
  onReject?: (doc: Document) => void;
  onToggleApi?: (doc: Document) => void;
}

export function DocumentTable({ documents, onVerify, onValidate, onReject, onToggleApi }: Props) {
  const { currentRole, isReadOnly } = useStructura();

  return (
    <div className="structura-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="metadata-label">Réf.</TableHead>
            <TableHead className="metadata-label">Document</TableHead>
            <TableHead className="metadata-label">Bureau</TableHead>
            <TableHead className="metadata-label">Type</TableHead>
            <TableHead className="metadata-label">Date</TableHead>
            <TableHead className="metadata-label">Statut</TableHead>
            <TableHead className="metadata-label text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-12">
                Aucun document dans cette vue.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <TableRow key={doc.id} className="group transition-shadow hover:shadow-sm">
                <TableCell className="font-mono text-xs text-muted-foreground">{doc.id}</TableCell>
                <TableCell className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {doc.is_private && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                    {doc.is_public_api && <Globe className="h-3.5 w-3.5 text-status-verified" />}
                    {doc.name}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{doc.bureau}</TableCell>
                <TableCell className="font-mono text-xs">{doc.type_fichier}</TableCell>
                <TableCell className="font-mono text-xs">{doc.date_creation}</TableCell>
                <TableCell><StatusBadge status={doc.status} /></TableCell>
                <TableCell className="text-right">
                  <div className={cn('flex items-center justify-end gap-1', isReadOnly && 'online-readonly')}>
                    <Button variant="ghost" size="sm" className="nav-action h-7 px-2 text-xs">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    {doc.is_private && currentRole === 'super_utilisateur' && (
                      <ShareModal
                        documentName={doc.name}
                        onShare={() => toast.success(`Document "${doc.name}" partagé.`)}
                      />
                    )}
                    {doc.status === 'valide' && currentRole === 'super_utilisateur' && onToggleApi && (
                      <div className="flex items-center gap-1" title="Accessible via API">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        <Switch
                          checked={doc.is_public_api}
                          onCheckedChange={() => onToggleApi(doc)}
                          className="scale-75"
                        />
                      </div>
                    )}
                    {currentRole === 'verificateur' && doc.status === 'brouillon' && onVerify && (
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => onVerify(doc)} disabled={isReadOnly}>
                        Vérifier
                      </Button>
                    )}
                    {currentRole === 'validateur' && doc.status === 'verifie' && onValidate && (
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs text-status-validated-foreground" onClick={() => onValidate(doc)} disabled={isReadOnly}>
                        Valider
                      </Button>
                    )}
                    {(currentRole === 'validateur' || currentRole === 'verificateur') && doc.status !== 'rejete' && doc.status !== 'valide' && onReject && (
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs text-status-rejected-foreground" onClick={() => onReject(doc)} disabled={isReadOnly}>
                        Rejeter
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
