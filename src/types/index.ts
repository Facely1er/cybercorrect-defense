export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'risk_manager' | 'auditor' | 'viewer';
  avatar?: string;
};

export type Asset = {
  id?: string;
  name: string;
  description?: string;
  type?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};