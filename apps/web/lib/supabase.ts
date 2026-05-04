// ============================================================
// SOBRE RUEDAS — Supabase client (App Router compatible)
// ============================================================

import { createBrowserClient } from '@supabase/ssr';

/**
 * Cliente de Supabase para usar en componentes cliente (browser)
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
