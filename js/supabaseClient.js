import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://knbdtiewpyowgowksahk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYmR0aWV3cHlvd2dvd2tzYWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTYwMTEsImV4cCI6MjEwODg5MjAxMX0.qLYOvNxTKoeN4Wd3xdO0YytE9G4ZYrA4leGBgChp75U";

if (!supabaseAnonKey || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY" || supabaseAnonKey === "******") {
  throw new Error("Supabase anon key is not configured.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
