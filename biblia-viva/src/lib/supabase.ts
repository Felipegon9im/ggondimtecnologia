import { createClient } from '@supabase/supabase-js';

// Substitua com as chaves reais do seu projeto Supabase (Projeto > Configurações > API)
// Para o MVP rodar localmente sem os dados reais, usaremos valores de fallback ou lance erro.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sua-url-supabase.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua-anon-key-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
