// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewvzsofyvxcctuxxqibo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3dnpzb2Z5dnhjY3R1eHhxaWJvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Njk0NTMxMywiZXhwIjoyMDEyNTIxMzEzfQ.2soO0wUz1w5uO9640joQmZ-I-AOkhqKxRhrU4N9NK5s';

export const supabase = createClient(supabaseUrl, supabaseKey);
