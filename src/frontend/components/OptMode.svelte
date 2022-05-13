<script>
    export let mode = "pdf";
    export let fileName = null;
    export let errorMsg = "";
</script>

<fieldset class="column-flex">
    <legend>Output type</legend>
    <div class="radiobutton">
        <input type="radio" bind:group={mode} value="jpg" />
        <span>JPG</span>
    </div>
    <div class="radiobutton" data-tooltip={errorMsg || null}>
        <input type="radio" bind:group={mode} value="pdf" />
        <span>PDF</span>
        <input
            class="input-text {mode != 'pdf' && 'disabled'} {errorMsg && 'error'}"
            type="text"
            placeholder="file name"
            bind:value={fileName}
            disabled={mode != "pdf"}
        />
    </div>
</fieldset>

<style>
    .column-flex {
        display: flex;
        flex-direction: column;
    }

    .input-text {
        width: 100px;
    }

    .radiobutton {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
    }

    input[type="radio"] {
        width: 1.1em;
        height: 1.1em;
        margin: 0;
        cursor: pointer;
    }

    input[type="radio"]:focus {
        outline: none;
    }

    .radiobutton span {
        padding-left: 5px;
        padding-right: 5px;
    }

    .disabled {
        opacity: 0.5;
    }

    .error {
        background-color: var(--error-text);
    }
</style>
