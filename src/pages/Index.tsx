import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StructuraProvider } from '@/contexts/StructuraContext';
import { AppSidebar } from '@/components/structura/AppSidebar';
import { AppHeader } from '@/components/structura/AppHeader';
import { DocumentDashboard } from '@/components/structura/DocumentDashboard';
import { TrashView } from '@/components/structura/TrashView';
import { AdminView } from '@/components/structura/AdminView';
import { AuditView } from '@/components/structura/AuditView';
import { ApiGatewayView } from '@/components/structura/ApiGatewayView';

function AppContent() {
  const [currentView, setCurrentView] = useState('documents');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader />
          <main className="flex-1 p-6 overflow-auto">
            {currentView === 'documents' && <DocumentDashboard />}
            {currentView === 'corbeille' && <TrashView />}
            {currentView === 'administration' && <AdminView />}
            {currentView === 'api-gateway' && <ApiGatewayView />}
            {currentView === 'audit' && <AuditView />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function Index() {
  return (
    <StructuraProvider>
      <AppContent />
    </StructuraProvider>
  );
}
