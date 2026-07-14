const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'apps/web/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = 'gestionsobreruedas@gmail.com';
  const password = 'denusogtuda2026';

  console.log(`Intentando registrar: ${email}...`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error al registrar usuario:', error.message);
  } else {
    console.log('¡Usuario registrado exitosamente!', data.user.id);
    console.log('NOTA: Si Supabase tiene Confirmación de Email activada, revisa la bandeja de entrada de', email);
  }
}

createAdmin();
