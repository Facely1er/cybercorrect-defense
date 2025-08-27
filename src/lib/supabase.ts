import { createClient } from '@supabase/supabase-js';

interface Asset {
  id?: string;
  name: string;
  description?: string;
  type: string;
  location?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getAssets = async () => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createAsset = async (asset: Omit<Asset, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('assets')
    .insert([asset])
    .select();
  return { data, error };
};

export const updateAsset = async (id: string, updates: Partial<Asset>) => {
  const { data, error } = await supabase
    .from('assets')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteAsset = async (id: string) => {
  const { data, error } = await supabase
    .from('assets')
    .delete()
    .eq('id', id);
  return { data, error };
};