<script>
    import Checkbox from "./Checkbox.svelte";

    export let checked = false;
    export let quality = null;
</script>

<div class="row-flex">
    <Checkbox bind:checked text="Quality" />
    <input class="input-text {!checked && 'disabled'}" type="number" placeholder="es: 1-100" bind:value={quality} disabled={!checked} />
</div>

<style>
    .row-flex {
        display: flex;
        align-items: center;
    }

    .input-text {
        width: 100px;
    }

    .disabled {
        opacity: 0.5;
    }
</style>
