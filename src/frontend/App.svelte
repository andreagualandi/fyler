<script>
	import { app, image } from "./Client";
	import InputSubmit from "./components/InputSubmit.svelte";
	import List from "./components/List.svelte";
	import Progress from "./components/Progress.svelte";
	import { afterUpdate, onMount } from "svelte";

	let brightDropZone = false;
	let files = [];
	let outFile = "";
	let selected = null;
	let blobImg = null;

	let working = false;
	let progressValue = 0;
	let progressText = "starting";

	/*-- debug --*/
	let time = 0;

	onMount(async () => {
		outFile = await app.getDownloadPath("outFile.pdf");
	});

	async function handleLoad(url) {
		/* working = true;

		// Returns a Promise that resolves after "ms" Milliseconds
		const timer = (ms) => new Promise((res) => setTimeout(res, ms));

		async function load() {
			// We need to wrap the loop into an async function for this to work
			for (var i = 1; i < 11; i++) {
				progressValue = i * 10;
				progressText = "running...";
				await timer(300); // then the created Promise can be awaited
			}
		}

		load();
		return; */
		/*const test = "local-video:///home/andrea/Scaricati/test.mp4";
		console.log("test", test);
		info = {
			title: "test",
			url: test,
			formats: [
				{
					id: 1,
					url: "fake",
					ext: "mp4",
					description: "fake descr",
				},
			],
			duration: 3476,
			thumbnail: "",
		};
		rangeValues = [0, info.duration];*/
	}

	async function killProcess() {
		working = false;
		//TODO HANDLE STOP
	}

	async function handleOpenFolder() {
		const result = await app.showSaveDialog();
		if (!result.canceled) {
			outFile = result.filePath;
		}
	}

	async function handleExecute() {
		console.log("work params", files);

		working = true;
		//TODO working
		const outFolder = await app.getDownloadPath();
		console.log("work out");
		const settings = {
			oFolder: outFolder,
			fileName: "test",
		};
		await image.process(files, settings);
		working = false;
	}

	function handleProgress(data) {
		progressValue = data.progress;
		progressText = data.status;
	}

	//todo check performance
	$: if (selected != null) {
		image.getBlob(selected).then((blob) => (blobImg = blob));
	}

	afterUpdate(() => {
		//console.log(rangeValues);
	});

	const dropZoneOn = (e) => {
		if (!e.fromElement && e.dataTransfer.effectAllowed == "all") {
			brightDropZone = true;
		}
	};

	const dropZoneOff = (e) => {
		if (!e.fromElement) {
			brightDropZone = false;
		}
	};
</script>

<main on:dragenter|preventDefault|self={dropZoneOn} on:drop|preventDefault={dropZoneOff} on:dragleave={dropZoneOff} ondragover="return false">
	<div class="main-container">
		<div class="flex-row color">
			<div class="left-column {brightDropZone ? 'drop-zone' : ''}">
				<List bind:items={files} getFiles={app.getFiles} bind:selected />
			</div>
			<div class="right-column">
				<img src={blobImg} alt="" />
			</div>
		</div>

		<InputSubmit onSubmit={handleOpenFolder} bind:text={outFile} placeholder="Output" />
		<button on:click={handleExecute}> execute </button>
	</div>

	{#if working}
		<Progress handleStop={killProcess} value={progressValue} text={progressText} />
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-flow: column;
		padding: 20px;
		height: 100%;
		box-sizing: border-box;
	}

	.main-container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.left-column {
		width: calc(100% - 400px);
		padding-right: 10px;
		overflow: hidden;
	}

	.right-column {
		width: 400px;
		background-color: black;
		display: flex;
		justify-content: center;
	}

	.right-column img {
		object-fit: scale-down;
	}

	.flex-row {
		display: flex;
		padding: 10px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.color {
		background-color: #292a34;
	}

	.drop-zone {
		/*background-color: #514bcf;*/
		border-color: #514bcf;
		border-style: dotted;
	}
</style>
