import { useStructura } from '@/contexts/StructuraContext';
import { UserRole } from '@/types/structura';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, UserCheck, CheckSquare, User } from 'lucide-react';

const roles: { value: UserRole; label: string; icon: typeof Shield }[] = [
  { value: 'super_utilisateur', label: 'Super Admin', icon: Shield },
  { value: 'validateur', label: 'Validateur', icon: CheckSquare },
  { value: 'verificateur', label: 'Vérificateur', icon: UserCheck },
  { value: 'utilisateur', label: 'Utilisateur', icon: User },
];

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useStructura();

  return (
    <Select value={currentRole} onValueChange={(v) => setCurrentRole(v as UserRole)}>
      <SelectTrigger className="nav-action h-8 w-auto gap-2 border-dashed text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {roles.map((r) => (
          <SelectItem key={r.value} value={r.value} className="text-xs">
            <div className="flex items-center gap-2">
              <r.icon className="h-3.5 w-3.5" />
              {r.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
