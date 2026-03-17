import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentTable } from './DocumentTable';
import { DocumentForm } from './DocumentForm';
import { mockDocuments } from '@/data/mock-data';
import { Document } from '@/types/structura';
import { toast } from 'sonner';
import { useStructura } from '@/contexts/StructuraContext';
import { motion } from 'framer-motion';

export function DocumentDashboard() {
  const [documents, setDocuments] = useState(mockDocuments);
  const { currentRole } = useStructura();
  const activeDocuments = documents.filter((d) => !d.is_deleted);

  const aVerifier = activeDocuments.filter((d) => d.status === 'brouillon');
  const aValider = activeDocuments.filter((d) => d.status === 'verifie');
  const archives = activeDocuments.filter((d) => d.status === 'valide');
  const rejetes = activeDocuments.filter((d) => d.status === 'rejete');

  const handleVerify = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, status: 'verifie' as const } : d))
    );
    toast.success(`Document ${doc.id} vérifié avec succès.`);
  };

  const handleValidate = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, status: 'valide' as const } : d))
    );
    toast.success('Document validé et archivé.', {
      action: { label: 'Voir en archive', onClick: () => {} },
    });
  };

  const handleReject = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, status: 'rejete' as const } : d))
    );
    toast.error(`Document ${doc.id} rejeté.`);
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
          <h2 className="text-sm font-semibold tracking-tight">Tableau de bord documentaire</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{activeDocuments.length} documents actifs</p>
        </div>
        <DocumentForm />
      </div>

      <Tabs defaultValue="a-verifier" className="space-y-3">
        <TabsList className="h-8 p-0.5 bg-secondary">
          <TabsTrigger value="a-verifier" className="text-xs h-7 gap-1.5">
            À Vérifier
            <span className="bg-status-draft text-status-draft-foreground rounded-full px-1.5 text-[10px] font-bold">{aVerifier.length}</span>
          </TabsTrigger>
          <TabsTrigger value="a-valider" className="text-xs h-7 gap-1.5">
            À Valider
            <span className="bg-status-verified/15 text-status-verified-foreground rounded-full px-1.5 text-[10px] font-bold">{aValider.length}</span>
          </TabsTrigger>
          <TabsTrigger value="archives" className="text-xs h-7 gap-1.5">
            Archivés
            <span className="bg-status-validated/15 text-status-validated-foreground rounded-full px-1.5 text-[10px] font-bold">{archives.length}</span>
          </TabsTrigger>
          <TabsTrigger value="rejetes" className="text-xs h-7 gap-1.5">
            Rejetés
            <span className="bg-status-rejected/15 text-status-rejected-foreground rounded-full px-1.5 text-[10px] font-bold">{rejetes.length}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="a-verifier">
          <DocumentTable documents={aVerifier} onVerify={handleVerify} onReject={handleReject} />
        </TabsContent>
        <TabsContent value="a-valider">
          <DocumentTable documents={aValider} onValidate={handleValidate} onReject={handleReject} />
        </TabsContent>
        <TabsContent value="archives">
          <DocumentTable documents={archives} />
        </TabsContent>
        <TabsContent value="rejetes">
          <DocumentTable documents={rejetes} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
