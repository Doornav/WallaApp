import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Config from 'react-native-config';

const supabaseUrl = "https://wqtgdfhipcratgdxohwd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxdGdkZmhpcGNyYXRnZHhvaHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzQxNDUsImV4cCI6MjA1NjgxMDE0NX0.qcxvFIU6K60i5LjhMoPQX2XQEmtBdKz0skOWg8aOcDk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})