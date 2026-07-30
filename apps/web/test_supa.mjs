import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbfjtvnvudvpdrahhiqk.supabase.co';
const supabaseKey = 'sb_publishable_jFho174Gd-zvzxAPXCiP4Q_VwcaFb9h';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log('Success, data:', data);
  }
}

test();
