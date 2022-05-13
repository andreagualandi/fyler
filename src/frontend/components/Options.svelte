<script>
    import { onMount } from "svelte";
    import { app } from "../Client";
    import Fa from "svelte-fa";
    import { faPlay, faFolder } from "@fortawesome/free-solid-svg-icons";
    import OptResolution from "./OptResolution.svelte";
    import OptQuality from "./OptQuality.svelte";
    import OptMode from "./OptMode.svelte";
    import OptFolder from "./OptFolder.svelte";

    import Options from "../Options";

    export let onSubmit;

    let options = new Options();
    let hasQuality = false;
    let errors = {};

    onMount(async () => {
        options.oFolder = await app.getDownloadPath();
    });

    async function handleSubmit() {
        errors = {};
        console.log("errors", JSON.stringify(errors));
        if (!options.validate()) {
            errors = options.errors;
            return false;
        }
        return onSubmit(options);
    }
</script>

<form class="options-form" on:submit|preventDefault={handleSubmit}>
    <div class="input-fields">
        <OptFolder bind:src={options.oFolder} errorMsg={errors.oFolder} />
        <div class="flex-row">
            <fieldset class="options-image">
                <legend>Image options</legend>
                <OptResolution bind:width={options.newWidth} bind:height={options.newHeight} errorMsg={errors.resolution} />
                <OptQuality bind:checked={hasQuality} bind:quality={options.quality} errorMsg={errors.quality} />
            </fieldset>

            <OptMode bind:mode={options.exportMode} bind:fileName={options.fileName} errorMsg={errors.fileName} />
        </div>
    </div>

    <button type="submit"><Fa icon={faPlay} /> Start</button>
</form>

<style>
    .options-form {
        display: flex;
        width: 100%;
    }

    .options-image {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    }

    .input-fields {
        display: flex;
        width: 100%;
        flex-direction: column;
        padding-right: 10px;
        justify-content: space-around;
    }

    .flex-row {
        display: flex;
    }
</style>
