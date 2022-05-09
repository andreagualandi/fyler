<script>
    import { onMount } from "svelte";
    import { app } from "../Client";
    import Fa from "svelte-fa";
    import { faPlay, faFolder } from "@fortawesome/free-solid-svg-icons";
    import OptResolution from "./OptResolution.svelte";
    import OptQuality from "./OptQuality.svelte";
    import OptMode from "./OptMode.svelte";

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
        console.log("options", JSON.stringify(options));
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
</script>

<form class="options-form" on:submit|preventDefault={handleSubmit}>
    <div class="input-fields">
        <div class="out-folder">
            <input class="input-text" type="text" placeholder="Output folder" bind:value={options.oFolder} />
            <p>{errors.oFolder}</p>
            <button class="input-button" on:click|preventDefault={handleOpenFolder}><Fa icon={faFolder} /></button>
        </div>
        <div class="flex-row">
            <fieldset>
                <legend>Image options</legend>
                <OptResolution bind:checked={hasResize} bind:width={options.newWidth} bind:height={options.newHeight} />
                <OptQuality bind:checked={hasQuality} bind:quality={options.quality} />
            </fieldset>

            <OptMode bind:mode={options.exportMode} bind:fileName={options.fileName} />
        </div>
    </div>

    <button type="submit"><Fa icon={faPlay} /> Start</button>
</form>

<style>
    .options-form {
        display: flex;
        width: 100%;
    }

    .input-fields {
        display: flex;
        width: 100%;
        flex-direction: column;
        padding-right: 10px;
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

    .flex-row {
        display: flex;
    }
</style>
