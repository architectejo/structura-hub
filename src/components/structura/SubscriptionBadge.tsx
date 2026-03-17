import { CalendarClock } from 'lucide-react';
import { SUBSCRIPTION_EXPIRY } from '@/data/mock-data';

export function SubscriptionBadge() {
  const expiry = new Date(SUBSCRIPTION_EXPIRY);
  const now = new Date();
  const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysLeft <= 30;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${
      isExpiringSoon
        ? 'bg-destructive/10 text-destructive border-destructive/20'
        : 'bg-status-validated/15 text-status-validated-foreground border-status-validated/20'
    }`}>
      <CalendarClock className="h-3 w-3" />
      <span>Exp. {expiry.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
    </div>
  );
}
