import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (v: 'list' | 'grid') => void;
}

export function SearchFilters({ search, onSearchChange, statusFilter, onStatusFilterChange, viewMode, onViewModeChange }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par nom, référence, bureau..."
          className="pl-8 h-8 text-xs"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="h-8 w-[140px] text-xs">
          <SelectValue placeholder="Tous statuts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-xs">Tous statuts</SelectItem>
          <SelectItem value="brouillon" className="text-xs">Brouillon</SelectItem>
          <SelectItem value="verifie" className="text-xs">Vérifié</SelectItem>
          <SelectItem value="valide" className="text-xs">Validé</SelectItem>
          <SelectItem value="rejete" className="text-xs">Rejeté</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center border rounded-md">
        <Button
          variant={viewMode === 'list' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onViewModeChange('list')}
        >
          <LayoutList className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onViewModeChange('grid')}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
