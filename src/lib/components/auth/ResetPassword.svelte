<script lang="ts">
    import supabaseStore from "$lib/stores/supabaseStore";

    let email: string = "";

    async function handlePasswordReset(email: string) {
        const { data, error } =
            await $supabaseStore?.auth.resetPasswordForEmail(email, {
                redirectTo: "auth/reset-password",
            });
    }
</script>

<form
    class="
bg-accent
    w-fit
px-24
py-8
rounded-lg
shadow-lg
flex
flex-col
gap-4"
>
    <div class="flex flex-row gap-2 items-center justify-center">
        <img class="w-20" src="/logo.png" />
    </div>
    <div class="form-control">
        <label class="label" for="mailInput">
            <span class="label-text">Email-Adresse</span></label
        >
        <input
            type="email"
            bind:value={email}
            placeholder="Email-Adresse"
            class="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
            required
            id="mailInput"
        />
    </div>
    <button
        on:click={() => {
            handlePasswordReset(email);
        }}
        type="submit"
        class="btn btn-neutral"
    >
        Password zurücksetzen
    </button>
</form>
