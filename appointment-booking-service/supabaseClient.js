require("dotenv").config();

const createClient = require("@supabase/supabase-js").createClient;

const supabaseClient = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY
);

module.exports = { supabaseClient };
