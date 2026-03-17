import { useState } from 'react';
import { OrgNode } from '@/types/structura';
import { useStructura } from '@/contexts/StructuraContext';
import { cn } from '@/lib/utils';
import { Building2, FolderOpen, Folder, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const typeIcons = {
  institution: Building2,
  direction: FolderOpen,
  division: Folder,
  bureau: Folder,
};

function TreeNode({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const { selectedNode, setSelectedNode } = useStructura();
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const isActive = selectedNode?.id === node.id;
  const Icon = typeIcons[node.type];

  return (
    <div className="relative">
      {depth > 0 && (
        <div
          className="absolute w-px bg-border"
          style={{ left: `${depth * 12 + 8}px`, top: 0, bottom: hasChildren && expanded ? 0 : '50%' }}
        />
      )}
      <button
        onClick={() => {
          setSelectedNode(node);
          if (hasChildren) setExpanded(!expanded);
        }}
        className={cn(
          'nav-action w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-sm transition-all duration-200 text-left group',
          isActive
            ? 'bg-secondary border-l-2 border-primary font-medium'
            : 'hover:bg-secondary/60 border-l-2 border-transparent'
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {hasChildren && (
          <ChevronRight
            className={cn(
              'h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200',
              expanded && 'rotate-90'
            )}
          />
        )}
        {!hasChildren && <span className="w-3" />}
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{node.name}</span>
      </button>

      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OrgTreeNav() {
  return (
    <nav className="p-3 space-y-1">
      <p className="metadata-label px-2 mb-2">Organisation</p>
      <TreeNode node={orgTree} />
    </nav>
  );
}
