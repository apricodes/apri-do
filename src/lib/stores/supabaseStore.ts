import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { SupabaseClient } from "@supabase/supabase-js";

// Create a writable store
// Updated within the layout.ts
const supabaseStore: Writable<SupabaseClient | null> = writable(null);

export default supabaseStore;