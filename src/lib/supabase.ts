import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// For development, allow missing Supabase config
let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase environment variables not found. Running in development mode without backend.');
}

export { supabase };

// Auth helpers
export const signUp = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabase) {
    return { error: new Error('Supabase not configured') };
  }
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (!supabase) {
    return { user: null, error: new Error('Supabase not configured') };
  }
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getAssets = async () => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createAsset = async (asset: Record<string, unknown>) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  const { data, error } = await supabase
    .from('assets')
    .insert([asset])
    .select();
  return { data, error };
};

export const updateAsset = async (id: string, updates: Record<string, unknown>) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  const { data, error } = await supabase
    .from('assets')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteAsset = async (id: string) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase not configured') };
  }
  const { data, error } = await supabase
    .from('assets')
    .delete()
    .eq('id', id);
  return { data, error };
};