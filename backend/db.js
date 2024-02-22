const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// console.log(supabaseUrl,supabaseKey)

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log("Connected to the database successfully.");
} catch (error) {
  console.error("Failed to connect to the database:", error);
}

module.exports = supabase;
