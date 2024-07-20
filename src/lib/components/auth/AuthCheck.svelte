<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { derived } from "svelte/store";
    import LoginForm from "./LoginForm.svelte";
    import ResetPassword from "./ResetPassword.svelte";
    import sessionStore from "$lib/stores/sessionStore";

    let loginOrReset: string = "login";
    let isInviteLink = false;
    let isResetLink = false;

    function changeForm() {
        loginOrReset = loginOrReset === "login" ? "reset" : "login";
    }

    const isInvitePage = derived(page, ($page) =>
        $page.url.pathname.startsWith("/auth/invitation/"),
    );

    async function checkForResetLink() {
        const params = new URLSearchParams(window.location.search); // Changed from window.location.hash
        isResetLink = params.has("code");
    }
    async function checkForInviteLink() {
        const hash = window.location.hash.substr(1);
        const params = new URLSearchParams(hash);
        isInviteLink = params.has("access_token");
    }

    onMount(async () => {
        await checkForInviteLink();
        await checkForResetLink();
    });
</script>

{#if $sessionStore || $isInvitePage || isInviteLink || isResetLink}
    <slot />
{:else}
    <div
        class="flex flex-col gap-4 w-screen h-screen justify-center items-center bg-black text-center"
    >
        {#if loginOrReset != "login"}
            <ResetPassword />
        {:else}
            <LoginForm />
        {/if}
        <div class="absolute bottom-4 right-4 label justify-end">
            <button
                class="btn link-hover link label-text-alt"
                on:click={changeForm}
            >
                {#if loginOrReset == "login"}Passwort zurücksetzen{:else}Einloggen{/if}
            </button>
        </div>
    </div>
{/if}
