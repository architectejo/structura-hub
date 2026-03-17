import { useState } from 'react';
import { useStructura } from '@/contexts/StructuraContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export function DocumentForm() {
  const { isReadOnly, breadcrumb } = useStructura();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Document soumis avec succès à la file "À Vérifier".');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 text-xs" disabled={isReadOnly}>
          <Upload className="h-3.5 w-3.5" />
          Déposer un document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold tracking-tight">Encodage de document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-3 p-3 rounded-md bg-secondary/50 border border-dashed">
            <p className="metadata-label">Rattachement organisationnel (auto)</p>
            <p className="text-sm">{breadcrumb.map((n) => n.name).join(' › ')}</p>
          </div>

          <div className="grid gap-3">
            <div>
              <Label className="metadata-label">Nom du document *</Label>
              <Input placeholder="Ex: Arrêté n°245 - Nomination" className="mt-1" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="metadata-label">Type de fichier *</Label>
                <Select required>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                    <SelectItem value="img">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="metadata-label">Date de création *</Label>
                <Input type="date" className="mt-1" required />
              </div>
            </div>
            <div>
              <Label className="metadata-label">Fichier *</Label>
              <div className="mt-1 border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Glisser-déposer ou cliquer pour sélectionner</p>
              </div>
            </div>
            <div>
              <Label className="metadata-label">Commentaires</Label>
              <Textarea placeholder="Notes additionnelles..." className="mt-1 resize-none" rows={3} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
              <X className="h-3.5 w-3.5 mr-1" />
              Annuler
            </Button>
            <Button type="submit" size="sm" className="gap-1">
              <Upload className="h-3.5 w-3.5" />
              Soumettre à vérification
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
