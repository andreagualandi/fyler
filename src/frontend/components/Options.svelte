<script>
    import Fa from "svelte-fa";
    import { faPlay, faFolder } from "@fortawesome/free-solid-svg-icons";

    export let onSubmit;

    let exportMode = "single";
    let fileName = "";
    let fileSuffix = "";
    let outFolder = "";

    let options = [];
    let selected;

    function handleChangeExportMode(mode) {
        console.log("Change export from", exportMode, "to", mode);
        exportMode = mode;
    }

    function handleClickFolderSelector() {
        console.log("Folder select");
    }
</script>

<form class="input-form" on:submit|preventDefault={onSubmit()}>
    <div class="tile-container">
        <div class="tile {exportMode !== 'single' && 'disabled'}">
            <div class="tile-header" on:click|preventDefault={() => handleChangeExportMode("single")}>Single file</div>
            <div class="tile-body">
                <span>Name:</span>
                <input class="input-text" type="text" placeholder="es: out" disabled={exportMode !== "single"} bind:value={fileName} />
            </div>
        </div>

        <div class="tile {exportMode !== 'multiple' && 'disabled'}">
            <div class="tile-header" on:click|preventDefault={() => handleChangeExportMode("multiple")}>Multiple file</div>
            <div class="tile-body">
                <span>Suffix:</span>
                <input class="input-text" type="text" placeholder="es: _new" disabled={exportMode !== "multiple"} bind:value={fileSuffix} />
                <span>Type:</span>
                <select name="select" bind:value={selected} disabled={exportMode !== "multiple"}>
                    <option value="" disabled selected>Select a format</option>
                    <option value="pdf">PDF</option>
                    <option value="jpg">JPG</option>
                </select>
            </div>
        </div>
    </div>

    <div class="out-folder">
        <input class="input-text" type="text" placeholder="Output folder" bind:value={outFolder} />
        <button class="input-button" on:click|preventDefault={handleClickFolderSelector}><Fa icon={faFolder} /></button>
    </div>

    <button type="submit"><Fa icon={faPlay} /></button>
</form>

<style>
    .input-form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .input-text {
        height: 2em;
    }

    .disabled {
        opacity: 0.5;
        border-color: lightgray !important;
        border-width: 1px !important;
    }

    .tile-container {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
    }

    .tile {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        border-style: solid;
        border-width: 1px;
        border-color: var(--text);
        width: 49%;
    }

    .tile-header {
        font-size: x-large;
        background-color: var(--foreground-2);
        text-align: center;
        cursor: pointer;
        border-radius: 5px 5px 0px 0px;
    }

    .tile-body {
        display: flex;
        padding: 5px;
        align-items: center;
        white-space: nowrap;
    }

    .tile-body span {
        margin-left: 10px;
        margin-right: 10px;
    }

    .tile-body input {
        width: 100%;
    }

    .tile-body select {
        height: 2em;
        padding: 1px 2px;
        box-sizing: unset;
        border-radius: 3px;
        border-width: 1px;
    }

    .out-folder {
        display: flex;
    }

    .out-folder input {
        width: 100%;
    }
</style>
