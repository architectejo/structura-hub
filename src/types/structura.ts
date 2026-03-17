export type DocumentStatus = 'brouillon' | 'verifie' | 'valide' | 'rejete';
export type AppMode = 'local' | 'online';
export type UserRole = 'super_utilisateur' | 'validateur' | 'verificateur' | 'encodeur' | 'visiteur';

export interface OrgNode {
  id: string;
  name: string;
  type: 'institution' | 'direction' | 'division' | 'bureau';
  children?: OrgNode[];
}

export interface Document {
  id: string;
  name: string;
  status: DocumentStatus;
  bureau: string;
  division: string;
  direction: string;
  institution: string;
  type_fichier: string;
  date_creation: string;
  commentaire?: string;
  is_private: boolean;
  is_public_api: boolean;
  created_by: string;
  is_deleted: boolean;
  deleted_at?: string;
}

export interface Notification {
  id: string;
  type: 'system' | 'workflow';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  is_active: boolean;
}
