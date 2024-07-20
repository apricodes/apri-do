<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
    import Avatar from '$lib/components/account/Avatar.svelte';
	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let loading = false
	let fullName: string = profile?.full_name ?? ''
	let username: string = profile?.username ?? ''
	let website: string = profile?.website ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

	const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}
</script>

<div class="p-6 bg-base-200 rounded-lg shadow-lg">
	
	<form
		class="form bg-white p-6 rounded-lg shadow-md"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
	<div class="form-control">
		<label class="label" for="email">Profile Image</label>

    <Avatar
    {supabase}
    bind:url={avatarUrl}
    size={10}
    on:upload={() => {
      profileForm.requestSubmit();
    }}
  />
	</div>

	<div class="form-control my-4">
		<label class="label" for="email">Email</label>
			<input id="email" type="text" class="input input-bordered" value={session.user.email} disabled />
		</div>

		<div>
			<label class="label" for="fullName">Full Name</label>
			<input id="fullName" name="fullName" type="text" class="input input-bordered" value={form?.fullName ?? fullName} />
		</div>

		<div>
			<label class="label" for="username">Username</label>
			<input id="username" name="username" type="text" class="input input-bordered" value={form?.username ?? username} />
		</div>

		<div>
			<label class="label" for="website">Website</label>
			<input id="website" name="website" type="url" class="input input-bordered" value={form?.website ?? website} />
		</div>

		<div class="form-control mt-6">
			<input
				type="submit"
				class="btn btn-primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut} class="mt-4">
		<div class="form-control">
			<button class="btn btn-error" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>