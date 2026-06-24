import { createClient } from "@supabase/supabase-js";
//#region src/integrations/supabase/client.ts
function createSupabaseClient() {
	return createClient("https://fxdyfzqlslrjairipnsm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZHlmenFsc2xyamFpcmlwbnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTk3NjUsImV4cCI6MjA5Nzc3NTc2NX0.EHOBkgD7CueESzclsizlI0SGPCHW3mEYrCdIfEFfWEU", { auth: {
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
