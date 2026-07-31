import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ktpmsqliiokkthqlemmm.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cG1zcWxpaW9ra3RocWxlbW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTEyMzYsImV4cCI6MjEwMTA4NzIzNn0.ZQosm0kydwU2q-ms-FhhUA6Au38fSTJBFj6PkhGgO3g'

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
