<script>
    export let checked = false;
    export let text = "";
</script>

<div class="checkbox">
    <input type="checkbox" bind:checked />
    <span>{text}</span>
</div>

<style>
    .checkbox {
        display: inline-flex;
        align-items: center;
        width: 100px;
    }
    input[type="checkbox"] {
        accent-color: var(--foreground-1);
        width: 1.1em;
        height: 1.1em;
        cursor: pointer;
        margin: 0;
    }

    input[type="checkbox"]:focus {
        outline: none;
    }

    input[type="checkbox"]:hover {
        accent-color: var(--hover);
    }

    .checkbox span {
        margin-left: 10px;
    }
</style>
