import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useStructura } from '@/contexts/StructuraContext';
import { OrgTreeNav } from './OrgTreeNav';
import { FileText, Trash2, Shield, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function AppSidebar({ currentView, onViewChange }: Props) {
  const { currentRole } = useStructura();

  const mainItems = [
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'corbeille', label: 'Corbeille', icon: Trash2 },
  ];

  const adminItems = [
    { id: 'administration', label: 'Administration', icon: Shield },
    { id: 'audit', label: 'Audit', icon: Activity },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <div className="p-4 border-b">
          <h1 className="text-sm font-semibold tracking-tight">Structura</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Archivage hybride</p>
        </div>

        <OrgTreeNav />

        <SidebarGroup>
          <SidebarGroupLabel className="metadata-label">Vues</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      'nav-action',
                      currentView === item.id && 'bg-secondary font-medium border-l-2 border-primary'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {currentRole === 'super_utilisateur' && (
          <SidebarGroup>
            <SidebarGroupLabel className="metadata-label">Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      className={cn(
                        'nav-action',
                        currentView === item.id && 'bg-secondary font-medium border-l-2 border-primary'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
