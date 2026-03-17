import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentTable } from './DocumentTable';
import { DocumentGrid } from './DocumentGrid';
import { DocumentForm } from './DocumentForm';
import { SearchFilters } from './SearchFilters';
import { mockDocuments } from '@/data/mock-data';
import { Document } from '@/types/structura';
import { toast } from 'sonner';
import { useStructura } from '@/contexts/StructuraContext';
import { motion } from 'framer-motion';

export function DocumentDashboard() {
  const [documents, setDocuments] = useState(mockDocuments);
  const { currentRole } = useStructura();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const activeDocuments = documents.filter((d) => !d.is_deleted);

  // Visiteur: only validated docs
  const visibleDocuments = currentRole === 'visiteur'
    ? activeDocuments.filter((d) => d.status === 'valide')
    : activeDocuments;

  const filtered = useMemo(() => {
    let docs = visibleDocuments;
    if (search) {
      const q = search.toLowerCase();
      docs = docs.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.bureau.toLowerCase().includes(q) ||
        d.direction.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      docs = docs.filter((d) => d.status === statusFilter);
    }
    return docs;
  }, [visibleDocuments, search, statusFilter]);

  const aVerifier = filtered.filter((d) => d.status === 'brouillon');
  const aValider = filtered.filter((d) => d.status === 'verifie');
  const archives = filtered.filter((d) => d.status === 'valide');
  const rejetes = filtered.filter((d) => d.status === 'rejete');

  const handleVerify = (doc: Document) => {
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? { ...d, status: 'verifie' as const } : d)));
    toast.success(`Document ${doc.id} vérifié avec succès.`);
  };

  const handleValidate = (doc: Document) => {
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? { ...d, status: 'valide' as const } : d)));
    toast.success('Document validé et archivé.');
  };

  const handleReject = (doc: Document) => {
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? { ...d, status: 'rejete' as const } : d)));
    toast.error(`Document ${doc.id} rejeté.`);
  };

  const handleToggleApi = (doc: Document) => {
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? { ...d, is_public_api: !d.is_public_api } : d)));
    toast.success(doc.is_public_api ? 'Document retiré de l\'API publique.' : 'Document accessible via API.');
  };

  // Encodeur & visiteur: simplified view
  const showTabs = currentRole !== 'visiteur';
  const canDeposit = currentRole !== 'visiteur';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">
            {currentRole === 'visiteur' ? 'Documents archivés (Consultation)' : 'Tableau de bord documentaire'}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} documents</p>
        </div>
        {canDeposit && <DocumentForm />}
      </div>

      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={currentRole === 'visiteur' ? 'valide' : statusFilter}
        onStatusFilterChange={setStatusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {currentRole === 'visiteur' ? (
        viewMode === 'list'
          ? <DocumentTable documents={archives} />
          : <DocumentGrid documents={archives} />
      ) : (
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
            {viewMode === 'list'
              ? <DocumentTable documents={aVerifier} onVerify={handleVerify} onReject={handleReject} onToggleApi={handleToggleApi} />
              : <DocumentGrid documents={aVerifier} />}
          </TabsContent>
          <TabsContent value="a-valider">
            {viewMode === 'list'
              ? <DocumentTable documents={aValider} onValidate={handleValidate} onReject={handleReject} onToggleApi={handleToggleApi} />
              : <DocumentGrid documents={aValider} />}
          </TabsContent>
          <TabsContent value="archives">
            {viewMode === 'list'
              ? <DocumentTable documents={archives} onToggleApi={handleToggleApi} />
              : <DocumentGrid documents={archives} />}
          </TabsContent>
          <TabsContent value="rejetes">
            {viewMode === 'list'
              ? <DocumentTable documents={rejetes} onToggleApi={handleToggleApi} />
              : <DocumentGrid documents={rejetes} />}
          </TabsContent>
        </Tabs>
      )}
    </motion.div>
  );
}
