import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.REACT_APP_SUPABASE_URL as string,
//   process.env.REACT_APP_SERVICE_KEY as string
// );

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL as string;
const SUPABASE_AMON_KEY = process.env.REACT_APP_SERVICE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_AMON_KEY);

export default supabase;
