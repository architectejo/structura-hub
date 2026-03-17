import { useStructura } from '@/contexts/StructuraContext';
import { HardDrive, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ModeBadge() {
  const { mode, setMode, isReadOnly } = useStructura();

  return (
    <button
      onClick={() => setMode(mode === 'local' ? 'online' : 'local')}
      className={cn(
        'nav-action inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200',
        mode === 'local' ? 'mode-badge-local' : 'mode-badge-online'
      )}
    >
      {mode === 'local' ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-amber-500" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600" />
          </span>
          <HardDrive className="h-3.5 w-3.5" />
          Mode Local
        </>
      ) : (
        <>
          <Cloud className="h-3.5 w-3.5" />
          Mode En Ligne
          {isReadOnly && <span className="text-[9px] opacity-70">(Lecture seule)</span>}
        </>
      )}
    </button>
  );
}
