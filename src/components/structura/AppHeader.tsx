import { useStructura } from '@/contexts/StructuraContext';
import { ModeBadge } from './ModeBadge';
import { NotificationCenter } from './NotificationCenter';
import { RoleSwitcher } from './RoleSwitcher';
import { SubscriptionBadge } from './SubscriptionBadge';
import { ChevronRight } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader() {
  const { breadcrumb } = useStructura();

  return (
    <header className="h-12 flex items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger className="nav-action shrink-0" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-0 overflow-hidden">
          {breadcrumb.map((node, i) => (
            <span key={node.id} className="flex items-center gap-1 shrink-0">
              {i > 0 && <ChevronRight className="h-3 w-3 text-border" />}
              <span className={i === breadcrumb.length - 1 ? 'text-foreground font-medium truncate' : 'truncate'}>
                {node.name}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <SubscriptionBadge />
        <RoleSwitcher />
        <ModeBadge />
        <NotificationCenter />
      </div>
    </header>
  );
}
