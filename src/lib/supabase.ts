import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('--- Supabase Diagnostic ---');
console.log('URL found:', !!supabaseUrl);
console.log('Key found:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Admin features will be disabled.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
