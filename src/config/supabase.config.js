import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nxbxvgycqakvsaksoyqm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54Ynh2Z3ljcWFrdnNha3NveXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MTk3ODgsImV4cCI6MjA0NDM5NTc4OH0.R-PiJqs2o71uBkvbPju_5KrKi4ra_NwAm8jAbrvSCuM"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase