import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_AMON_KEY = process.env.REACT_APP_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_AMON_KEY);

export default supabase;
