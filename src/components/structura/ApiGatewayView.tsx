import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Plus, Copy, Trash2, ToggleLeft, ToggleRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockApiKeys } from '@/data/mock-data';
import { ApiKey } from '@/types/structura';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function ApiGatewayView() {
  const [keys, setKeys] = useState<ApiKey[]>(mockApiKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const generateKey = () => {
    if (!newKeyName.trim()) return;
    const newKey: ApiKey = {
      id: `ak-${Date.now()}`,
      name: newKeyName,
      key: `sk_live_structura_${Math.random().toString(36).slice(2, 14)}...`,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
    };
    setKeys((prev) => [newKey, ...prev]);
    setNewKeyName('');
    setDialogOpen(false);
    toast.success(`Clé API "${newKey.name}" générée avec succès.`);
  };

  const toggleKey = (id: string) => {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, is_active: !k.is_active } : k));
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast.success('Clé API révoquée.');
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Clé copiée dans le presse-papiers.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">API Gateway</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Gérez les clés d'accès à l'API de diffusion publique.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <BookOpen className="h-3.5 w-3.5" />
            Documentation
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" />
                Nouvelle clé
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-sm font-semibold">Générer une clé API</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <div>
                  <Label className="metadata-label">Nom de la clé *</Label>
                  <Input
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Ex: Portail Citoyen"
                    className="mt-1"
                  />
                </div>
                <Button size="sm" className="w-full gap-1.5 text-xs" onClick={generateKey}>
                  <Key className="h-3.5 w-3.5" />
                  Générer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="structura-card p-4 space-y-2 bg-secondary/30 border-dashed">
        <p className="text-xs font-semibold">Endpoint de diffusion</p>
        <code className="text-xs font-mono bg-background px-3 py-2 rounded border block">
          GET /api/v1/documents?status=valide&is_public_api=true
        </code>
        <p className="text-[10px] text-muted-foreground">
          Seuls les documents validés et marqués « Accessible via API » sont exposés.
        </p>
      </div>

      <div className="structura-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="metadata-label">Nom</TableHead>
              <TableHead className="metadata-label">Clé</TableHead>
              <TableHead className="metadata-label">Créée le</TableHead>
              <TableHead className="metadata-label">État</TableHead>
              <TableHead className="metadata-label text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((k) => (
              <TableRow key={k.id}>
                <TableCell className="text-sm font-medium">{k.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{k.key}</TableCell>
                <TableCell className="font-mono text-xs">{k.created_at}</TableCell>
                <TableCell>
                  <span className={cn(
                    'status-badge',
                    k.is_active
                      ? 'bg-status-validated/15 text-status-validated-foreground'
                      : 'bg-status-draft text-status-draft-foreground'
                  )}>
                    {k.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => copyKey(k.key)}>
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => toggleKey(k.id)}>
                      {k.is_active ? <ToggleRight className="h-4 w-4 text-status-validated-foreground" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={() => revokeKey(k.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
