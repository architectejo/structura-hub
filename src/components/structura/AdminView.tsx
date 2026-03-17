import { motion } from 'framer-motion';
import { Shield, Users, CreditCard } from 'lucide-react';

export function AdminView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div>
        <h2 className="text-sm font-semibold tracking-tight">Administration</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Gestion des rôles, abonnements et paramètres système.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Users, title: 'Utilisateurs', desc: '12 utilisateurs actifs', action: 'Gérer' },
          { icon: Shield, title: 'Rôles & Permissions', desc: '4 rôles configurés', action: 'Configurer' },
          { icon: CreditCard, title: 'Abonnement', desc: 'Plan Professionnel — Actif', action: 'Détails' },
        ].map((card) => (
          <div key={card.title} className="structura-card p-4 space-y-3 transition-shadow hover:shadow-md">
            <card.icon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold">{card.title}</p>
              <p className="text-xs text-muted-foreground">{card.desc}</p>
            </div>
            <button className="text-xs font-medium text-primary underline underline-offset-2">{card.action}</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
