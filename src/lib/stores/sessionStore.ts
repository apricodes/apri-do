import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Session } from "@supabase/supabase-js";

// Create a writable store
// Updated within the layout.ts
const sessionStore: Writable<Session | null> = writable(null);

export default sessionStore;