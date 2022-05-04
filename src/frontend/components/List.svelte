<script>
    import Fa from "svelte-fa";
    import { flip } from "svelte/animate";
    import { faPlus, faTrashAlt, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

    export let items;
    export let getFiles;
    export let selected = null;

    let hovering = false;
    let selectedIndex = null;

    function addFiles(newFiles) {
        //join and remove duplicates
        items = [...new Set(items.concat(newFiles))];
    }

    function setSelected(index) {
        selectedIndex = index;
        if (index == null) {
            selected = null;
        }
        selected = items[index];
    }

    function handleDropFiles(e) {
        if (e.dataTransfer.files.length == 0) return;
        const fileList = e.dataTransfer.files;
        const newFiles = Object.keys(fileList).map((key) => fileList[key].path);
        addFiles(newFiles);
    }

    async function handleClickAddFiles() {
        const newFiles = await getFiles();
        addFiles(newFiles);
    }

    function handleClickCleanFiles() {
        items = [];
        setSelected(null);
    }

    function handleSelected(index) {
        setSelected(index);
    }

    function handleMoveUp() {
        if (selectedIndex == null || selectedIndex == 0) return;

        [items[selectedIndex], items[selectedIndex - 1]] = [items[selectedIndex - 1], items[selectedIndex]];
        if (selectedIndex > 0) {
            setSelected(selectedIndex - 1);
        }
    }

    function handleMoveDown() {
        if (selectedIndex == null || selectedIndex == items.length - 1) return;

        [items[selectedIndex], items[selectedIndex + 1]] = [items[selectedIndex + 1], items[selectedIndex]];
        if (selectedIndex < items.length - 1) {
            setSelected(selectedIndex + 1);
        }
    }

    function handleRemove(index) {
        const newTracklist = items;
        newTracklist.splice(index, 1);
        items = newTracklist;
        setSelected(null);
    }

    function handleDrop(e, target) {
        if (e.dataTransfer.files.length > 0) return;

        e.dataTransfer.dropEffect = "move";
        const start = parseInt(e.dataTransfer.getData("text/plain"));
        const newTracklist = items;

        if (start < target) {
            newTracklist.splice(target + 1, 0, newTracklist[start]);
            newTracklist.splice(start, 1);
        } else {
            newTracklist.splice(target, 0, newTracklist[start]);
            newTracklist.splice(start + 1, 1);
        }

        items = newTracklist;
        setSelected(target);
        hovering = null;
    }

    function handleDragStart(e, i) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        const start = i;
        e.dataTransfer.setData("text/plain", start);
    }

    function handleDragLeave(e) {
        if (!e.currentTarget.contains(e.relatedTarget) && e.fromElement.id != "list-item") {
            hovering = false;
        }
    }
</script>

<div class="file-list">
    <div class="controls">
        <button class="button-add" on:click|preventDefault={handleClickAddFiles}>
            <Fa icon={faPlus} />
        </button>
        <button class="button-clean" on:click|preventDefault={handleClickCleanFiles}>
            <Fa icon={faTrashAlt} />
        </button>
        <button class="button-up" on:click|preventDefault={handleMoveUp}>
            <Fa icon={faAngleUp} />
        </button>
        <button class="button-down" on:click|preventDefault={handleMoveDown}>
            <Fa icon={faAngleDown} />
        </button>
    </div>
    <div class="list" on:drop|preventDefault={handleDropFiles}>
        {#each items as n, index (n)}
            <div
                id="list-item"
                class="list-item {selectedIndex == index ? 'selected' : ''}"
                animate:flip
                draggable={true}
                on:dragstart={(e) => handleDragStart(e, index)}
                on:drop|preventDefault={(e) => handleDrop(e, index)}
                ondragover="return false"
                on:dragenter|preventDefault={() => (hovering = index)}
                on:dragleave={handleDragLeave}
                class:is-active={hovering === index}
                on:click={handleSelected(index)}
            >
                <span class="item-number">{index + 1}</span>
                <div class="item-name">{n}</div>
                <button class="list-item-remove" on:click={handleRemove(index)}><Fa icon={faTrashAlt} /></button>
            </div>
        {/each}
    </div>
</div>

<style>
    .file-list {
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .list {
        padding: 5px;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }

    .list-item {
        padding: 5px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .list-item-remove {
        width: 60px;
        text-align: center;
    }

    .list-item:not(:last-child) {
        border-bottom: 1px solid #dbdbdb;
    }

    .list-item.is-active {
        box-shadow: inset 0px 0px 7px 6px #514bcf;
    }

    .item-number {
        background-color: #6864ed5c;
        width: 60px;
        border: 1px solid black;
        justify-content: center;
        display: flex;
        align-items: center;
    }

    .item-name {
        overflow: hidden;
        width: 100%;
        padding: 5px 50px 5px 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .controls {
        display: flex;
        padding: 10px;
    }

    .selected {
        background-color: #b4b3ba;
        color: #444f97;
    }
</style>
