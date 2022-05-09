<script>
    import Checkbox from "./Checkbox.svelte";

    export let checked = false;
    export let width = 0;
    export let height = 0;
</script>

<div class="row-flex">
    <Checkbox bind:checked text="Resize" />
    <fieldset class="row-flex {!checked && 'disabled'}" disabled={!checked}>
        <input class="input-text" type="number" placeholder="width" bind:value={width} />
        <span>x</span>
        <input class="input-text" type="number" placeholder="height" bind:value={height} />
    </fieldset>
</div>

<style>
    .row-flex {
        display: flex;
        align-items: center;
    }

    .row-flex span {
        padding-left: 5px;
        padding-right: 5px;
    }

    .input-text {
        width: 100px;
    }

    .disabled {
        opacity: 0.5;
    }

    .row-flex fieldset {
        border: none;
        margin: 0;
        padding: 0;
    }
</style>
