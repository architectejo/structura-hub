import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { mockNotifications } from '@/data/mock-data';

export function AuditView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold tracking-tight">Journal d'audit</h2>
      </div>

      <div className="structura-card divide-y">
        {mockNotifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 p-3">
            <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${n.type === 'workflow' ? 'bg-status-verified' : 'bg-muted-foreground'}`} />
            <div>
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {new Date(n.timestamp).toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
