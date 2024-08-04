<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "../app.css";
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
    import Navbar from "$lib/components/app/Navbar.svelte";
    import { redirect } from "@sveltejs/kit";
	import { page } from '$app/stores';
    import AuthCheck from "$lib/components/auth/AuthCheck.svelte";

	export let data

	let p = $page.url.pathname
	console.log(p)
	let { supabase, session } = data
	$: ({ supabase, session } = data)
	$: ({ $page})
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
	
</script>

<svelte:head>
	<title>Apri-Do</title>
</svelte:head>

<AuthCheck>
<div>
    <Navbar></Navbar>
	
	<slot />
</div>
</AuthCheck>