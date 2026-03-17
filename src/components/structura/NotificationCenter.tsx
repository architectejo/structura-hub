import { useState } from 'react';
import { Bell, AlertCircle, GitPullRequest } from 'lucide-react';
import { mockNotifications } from '@/data/mock-data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function NotificationCenter() {
  const [notifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="nav-action relative p-2 rounded-md hover:bg-secondary transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-status-rejected text-[9px] font-bold text-primary-foreground flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b">
          <p className="text-sm font-semibold">Notifications</p>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                'flex items-start gap-3 p-3 border-b last:border-0 transition-colors',
                !n.read && 'bg-secondary/50'
              )}
            >
              {n.type === 'workflow' ? (
                <GitPullRequest className="h-4 w-4 text-status-verified mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              )}
              <div>
                <p className="text-sm leading-relaxed">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {new Date(n.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
