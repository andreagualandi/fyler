<script>
    import Checkbox from "./Checkbox.svelte";

    export let checked = false;
    export let quality = null;
    export let errorMsg = "";
</script>

<div class="row-flex" data-tooltip={errorMsg || null}>
    <Checkbox bind:checked text="Quality:" />
    <input
        class="input-text {!checked && 'disabled'} {errorMsg && 'error'}"
        type="number"
        placeholder="es: 1-100"
        bind:value={quality}
        disabled={!checked}
    />
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

    .error {
        background-color: var(--error-text);
    }
</style>
