import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Share2, Users } from 'lucide-react';

const mockUsers = [
  { id: 'user-1', name: 'Jean Mbala', bureau: 'Bureau Concours' },
  { id: 'user-2', name: 'Marie Lutonadio', bureau: 'Bureau Intégration' },
  { id: 'user-3', name: 'Paul Kabongo', bureau: 'Bureau Litiges' },
  { id: 'user-4', name: 'Claire Mwamba', bureau: 'Bureau Planification' },
];

const mockBureaux = ['Bureau Concours', 'Bureau Intégration', 'Bureau Litiges', 'Bureau Planification'];

interface Props {
  documentName: string;
  trigger?: React.ReactNode;
  onShare?: (userIds: string[], bureaux: string[]) => void;
}

export function ShareModal({ documentName, trigger, onShare }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedBureaux, setSelectedBureaux] = useState<string[]>([]);

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) => prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]);
  };

  const toggleBureau = (b: string) => {
    setSelectedBureaux((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="nav-action h-7 px-2 text-xs">
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold">Partager « {documentName} »</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <p className="metadata-label mb-2">Bureaux</p>
            <div className="space-y-2">
              {mockBureaux.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={selectedBureaux.includes(b)} onCheckedChange={() => toggleBureau(b)} />
                  {b}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="metadata-label mb-2">Utilisateurs</p>
            <div className="space-y-2">
              {mockUsers.map((u) => (
                <label key={u.id} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={selectedUsers.includes(u.id)} onCheckedChange={() => toggleUser(u.id)} />
                  <span>{u.name}</span>
                  <span className="text-xs text-muted-foreground">— {u.bureau}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button size="sm" className="gap-1.5 text-xs" onClick={() => onShare?.(selectedUsers, selectedBureaux)}>
              <Users className="h-3.5 w-3.5" />
              Partager ({selectedUsers.length + selectedBureaux.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
