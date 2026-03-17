import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppMode, UserRole, OrgNode } from '@/types/structura';
import { orgTree } from '@/data/mock-data';

interface StructuraContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedNode: OrgNode | null;
  setSelectedNode: (node: OrgNode | null) => void;
  breadcrumb: OrgNode[];
  setBreadcrumb: (nodes: OrgNode[]) => void;
  isReadOnly: boolean;
}

const StructuraContext = createContext<StructuraContextType | null>(null);

export function useStructura() {
  const ctx = useContext(StructuraContext);
  if (!ctx) throw new Error('useStructura must be used within StructuraProvider');
  return ctx;
}

function findPathToNode(tree: OrgNode, targetId: string, path: OrgNode[] = []): OrgNode[] | null {
  const currentPath = [...path, tree];
  if (tree.id === targetId) return currentPath;
  if (tree.children) {
    for (const child of tree.children) {
      const result = findPathToNode(child, targetId, currentPath);
      if (result) return result;
    }
  }
  return null;
}

export function StructuraProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('local');
  const [currentRole, setCurrentRole] = useState<UserRole>('super_utilisateur');
  const [selectedNode, setSelectedNodeState] = useState<OrgNode | null>(orgTree);
  const [breadcrumb, setBreadcrumb] = useState<OrgNode[]>([orgTree]);

  const setSelectedNode = (node: OrgNode | null) => {
    setSelectedNodeState(node);
    if (node) {
      const path = findPathToNode(orgTree, node.id);
      if (path) setBreadcrumb(path);
    }
  };

  const isReadOnly = mode === 'online';

  return (
    <StructuraContext.Provider value={{
      mode, setMode, currentRole, setCurrentRole,
      selectedNode, setSelectedNode, breadcrumb, setBreadcrumb, isReadOnly,
    }}>
      {children}
    </StructuraContext.Provider>
  );
}
