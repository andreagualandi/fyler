<script>
    export let width = 0;
    export let height = 0;
    export let errorMsg = "";
</script>

<div class="row-flex" data-tooltip={errorMsg || null}>
    <span class="label">Resolution:</span>
    <fieldset class="row-flex">
        <input class="input-text {errorMsg && 'error'}" type="number" placeholder="width" bind:value={width} />
        <span class="x">x</span>
        <input class="input-text {errorMsg && 'error'}" type="number" placeholder="height" bind:value={height} />
    </fieldset>
</div>

<style>
    .row-flex {
        display: flex;
        align-items: center;
    }

    .label {
        width: 100px;
    }

    .x {
        margin-left: 5px;
        margin-right: 5px;
    }

    .input-text {
        width: 100px;
    }

    .row-flex fieldset {
        border: none;
        margin: 0;
        padding: 0;
    }

    .error {
        background-color: var(--error-text);
    }
</style>
