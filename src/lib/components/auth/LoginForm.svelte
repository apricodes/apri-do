<script lang="ts">
    import { goto } from "$app/navigation";
    import supabaseStore from "$lib/stores/supabaseStore";
    import { enhance } from '$app/forms';

    let userEmail: string;
    let userPassword: string;
    let credentialInvalid: boolean = false;
    let loading = false;

    export let form: any;

    const handleSubmit: any = () => {
        loading = true;
        return async ({ update }: { update: () => void }) => {
            update();
            loading = false;
        };
    };

    async function handleLogin() {
        credentialInvalid = false;
        if ($supabaseStore) {
            const { error } = await $supabaseStore.auth.signInWithPassword({
                email: userEmail,
                password: userPassword,
                options: {
                    redirectTo: "/",
                },
            });
            if (error) {
                console.error("Supabase Authentication Error:", error);
                if (error?.message == "Invalid login credentials") {
                    credentialInvalid = true;
                }
            } else {
                goto("/");
            }
        }
    }

    async function handleMagicLink() {
        if ($supabaseStore) {
            const { error } = await $supabaseStore.auth.signInWithOtp({
                email: userEmail,
                options: {
                    emailRedirectTo: "/",
                },
            });
            if (error) {
                console.error("Supabase Magic Link Error:", error);
            } else {
                alert('Magic link sent to your email!');
            }
        }
    }
</script>

<form
    on:submit|preventDefault={handleLogin}
    class="bg-accent px-24 py-8 rounded-lg shadow-lg flex flex-col gap-4"
>
    <div class="flex flex-row gap-2 items-center justify-center">
    </div>
    <div class="form-control">
        <label class="label" for="mailInput">
            <span class="label-text">Email-Adresse</span>
        </label>
        <input
            bind:value={userEmail}
            type="email"
            placeholder="Email-Adresse"
            class="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
            required
            id="mailInput"
        />
    </div>
    <div class="form-control" if={userPassword}>
        <label class="label" for="pwInput">
            <span class="label-text">Password</span>
        </label>
        <input
            bind:value={userPassword}
            type="password"
            placeholder="Passwort"
            class="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
            minlength="4"
            id="pwInput"
        />
    </div>

    <div class="flex flex-col gap-4">
        <button type="submit" class="btn btn-neutral">Anmelden</button>
        <button type="button" on:click={handleMagicLink} class="btn btn-primary">Send Magic Link</button>
    </div>

    {#if credentialInvalid}
        <div class="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span class="text-sm">Mail-Adresse / Passwort falsch</span>
        </div>
    {/if}
</form>
