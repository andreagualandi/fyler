<script>
    import { onMount } from "svelte";
    import { app } from "../Client";
    import Fa from "svelte-fa";
    import { faPlay, faFolder } from "@fortawesome/free-solid-svg-icons";
    import ToggleButton from "./ToggleButton.svelte";

    import Options from "../Options";

    export let onSubmit;

    let options = new Options();
    let hasQuality = false;
    let hasResize = false;
    let errors = { oFolder: "", exportMode: "", fileName: "", fileSuffix: "", newWidth: "", newHeight: "" };

    onMount(async () => {
        options.oFolder = await app.getDownloadPath();
    });

    async function handleSubmit() {
        if (!options.validate()) {
            errors = { ...errors, ...options.errors };
            return false;
        }
        return onSubmit(options);
    }

    async function handleOpenFolder() {
        const result = await app.getFolder();
        if (result) {
            options.oFolder = result;
        }
    }

    function handleChangeExportMode(mode) {
        options.exportMode = mode;
    }
</script>

<form class="options-form" on:submit|preventDefault={handleSubmit}>
    <div class="input-fields">
        <div class="out-folder">
            <input class="input-text" type="text" placeholder="Output folder" bind:value={options.oFolder} />
            <p>{errors.oFolder}</p>
            <button class="input-button" on:click|preventDefault={handleOpenFolder}><Fa icon={faFolder} /></button>
        </div>

        <div class="image-compression">
            <fieldset class="image-compression-size {!hasResize && 'disabled'}" disabled={!hasResize}>
                <legend><ToggleButton bind:checked={hasResize} /> Resize</legend>

                <span>Width:</span>
                <input class="input-text" type="number" placeholder="es: 1980" bind:value={options.newWidth} />
                <span>Heigth:</span>
                <input class="input-text" type="number" placeholder="es: 720" bind:value={options.newHeight} />
            </fieldset>
            <fieldset class="image-compression-size {!hasQuality && 'disabled'}" disabled={!hasQuality}>
                <legend><ToggleButton bind:checked={hasQuality} /> Quality</legend>
                <input class="input-text" type="number" placeholder="es: 1-100" bind:value={options.quality} disabled={!hasQuality} />
            </fieldset>
        </div>

        <div class="tile-container">
            <fieldset class="tile {options.exportMode !== 'single' && 'disabled'}" disabled={options.exportMode !== "single"}>
                <div class="tile-header" on:click|preventDefault={() => handleChangeExportMode("single")}>Convert to PDF</div>
                <div class="tile-body">
                    <span>Name:</span>
                    <input class="input-text" type="text" placeholder="es: out" bind:value={options.fileName} />
                </div>
            </fieldset>
        </div>
    </div>

    <button type="submit"><Fa icon={faPlay} /> Start</button>
</form>

<style>
    .options-form {
        display: flex;
        width: 100%;
    }

    .row-flex {
        display: flex;
        align-items: center;
    }

    .input-fields {
        display: flex;
        width: 100%;
        flex-direction: column;
        padding-right: 10px;
    }

    .tile-container {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
    }

    .tile {
        display: flex;
        flex-direction: column;
        border: none;
        border-radius: 5px;
        width: 49%;
        padding: 0;
        margin: 0;
        background: var(--background-3);
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

    .input-text {
        height: 2em;
    }

    .out-folder {
        display: flex;
    }

    .out-folder input {
        width: 100%;
    }

    .disabled {
        opacity: 0.5;
    }
</style>
