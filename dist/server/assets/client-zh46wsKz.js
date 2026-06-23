import { createClient } from "@supabase/supabase-js";
//#region src/integrations/supabase/client.ts
function createSupabaseClient() {
	return createClient("https://cpcumyizkkwxkeeskuok.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwY3VteWl6a2t3eGtlZXNrdW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNjYzMzksImV4cCI6MjA5NzY0MjMzOX0.zgc56_-wPx2LZwVjNUYjrqcUXStob5OkgRBkbxgb8Rc", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
