<script>
    import Fa from "svelte-fa";
    import { faFolder } from "@fortawesome/free-solid-svg-icons";
    import { app } from "../Client";

    export let src = false;
    export let errorMsg = "";

    async function handleOpenFolder() {
        const result = await app.getFolder();
        if (result) {
            src = result;
        }
    }
</script>

<fieldset class="row-flex">
    <legend>Output folder</legend>
    <input class="input-text {errorMsg && 'error'}" type="text" placeholder="Output folder" bind:value={src} data-tooltip={errorMsg || null} />
    <button class="input-button" on:click|preventDefault={handleOpenFolder}><Fa icon={faFolder} /></button>
</fieldset>

<style>
    .input-text {
        height: 2em;
        width: 100%;
    }

    .row-flex {
        display: flex;
        align-items: center;
    }

    .error {
        background-color: var(--error-text);
    }
</style>
