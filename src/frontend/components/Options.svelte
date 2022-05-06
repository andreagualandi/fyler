<script>
    import { onMount } from "svelte";
    import { app } from "../Client";
    import Fa from "svelte-fa";
    import { faPlay, faFolder } from "@fortawesome/free-solid-svg-icons";

    import Options from "../Options";

    export let onSubmit;

    let opt = new Options();

    let options = {
        oFolder: "",
        fileName: "out_doc",
        exportMode: "single",
        fileSuffix: "_new",
        newWidth: 1024,
        newHeight: 768,
    };

    onMount(async () => {
        options.oFolder = await app.getDownloadPath();
        opt.validate();
        opt.oFolder = "ciao";
        opt.validate();
    });

    async function handleOpenFolder() {
        const result = await app.getFolder();
        console.log("eccolo", result);
        if (result) {
            console.log("asdasd", result);
            options.oFolder = result;
        }
    }

    function handleChangeExportMode(mode) {
        options.exportMode = mode;
    }
</script>

<form class="input-form" on:submit|preventDefault={() => onSubmit(options)}>
    <div class="input-fields">
        <div class="out-folder">
            <input class="input-text" type="text" placeholder="Output folder" bind:value={options.oFolder} />
            <button class="input-button" on:click|preventDefault={handleOpenFolder}><Fa icon={faFolder} /></button>
        </div>
        <div class="tile-container">
            <fieldset class="tile {options.exportMode !== 'single' && 'disabled'}" disabled={options.exportMode !== "single"}>
                <div class="tile-header" on:click|preventDefault={() => handleChangeExportMode("single")}>Convert to PDF</div>
                <div class="tile-body">
                    <span>Name:</span>
                    <input class="input-text" type="text" placeholder="es: out" bind:value={options.fileName} />
                </div>
            </fieldset>

            <fieldset class="tile {options.exportMode !== 'multiple' && 'disabled'}" disabled={options.exportMode !== "multiple"}>
                <div class="tile-header" on:click|preventDefault={() => handleChangeExportMode("multiple")}>Compress images</div>
                <div class="tile-body">
                    <span>Suffix:</span>
                    <input class="input-text" type="text" placeholder="es: _new" bind:value={options.fileSuffix} />
                    <span>Width:</span>
                    <input class="input-text" type="number" placeholder="es: 1980" bind:value={options.newWidth} />
                    <span>Heigth:</span>
                    <input class="input-text" type="number" placeholder="es: 720" bind:value={options.newHeight} />
                </div>
            </fieldset>
        </div>
    </div>

    <button type="submit"><Fa icon={faPlay} /> Start</button>
</form>

<style>
    .input-form {
        display: flex;
        width: 100%;
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
