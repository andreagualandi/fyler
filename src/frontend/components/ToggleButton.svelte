<script>
    export let checked = false;
</script>

<input class="switch" type="checkbox" bind:checked />

<style>
    .switch {
        --size: 1rem;
        appearance: none;
        opacity: 1 !important;
        width: calc(var(--size) * 2.2);
        height: var(--size);
        display: inline-block;
        border-radius: calc(var(--size) / 2);
        cursor: pointer;
        background-color: var(--text);
        background-image: radial-gradient(circle calc(var(--size) / 2.1), #fff 100%, #0000 0),
            radial-gradient(circle calc(var(--size) / 1.5), #0003 0%, #0000 100%);
        background-repeat: no-repeat;
        background-position: calc(var(--size) / -1.75) 0;
        transition: background 0.2s ease-out;
    }

    .switch:focus {
        outline-style: none;
    }

    .switch:checked {
        background-color: var(--foreground-2);
        background-position: calc(var(--size) / 1.75) 0;
    }
</style>
