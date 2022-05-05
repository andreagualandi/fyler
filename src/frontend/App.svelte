<script>
	import { app, image } from "./Client";
	import List from "./components/List.svelte";
	import Progress from "./components/Progress.svelte";
	import Options from "./components/Options.svelte";
	import { afterUpdate, onMount } from "svelte";

	let brightDropZone = false;
	let files = [];
	let selected = null;
	let blobImg = null;

	let working = false;
	let progressValue = 0;
	let progressText = "starting";

	/*-- debug --*/
	let time = 0;

	/* onMount(async () => {
		options.oFolder = await app.getDownloadPath();
	}); */

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

	async function handleExecute(options) {
		if (files.length == 0) return;
		console.log("work params", files, JSON.stringify(options));

		working = true;
		//TODO working
		console.log("work out");

		//await image.process(files, options);
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
		<div class="top-row color">
			<div class="left-column {brightDropZone ? 'drop-zone' : ''}">
				<List bind:items={files} getFiles={app.getFiles} bind:selected />
			</div>
			<div class="right-column">
				<img src={blobImg} alt="" />
			</div>
		</div>
		<div class="bottom-row color">
			<Options onSubmit={handleExecute} />
		</div>
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

	.top-row {
		display: flex;
		padding: 10px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.bottom-row {
		margin-top: 10px;
		padding: 10px;
		display: flex;
		box-sizing: border-box;
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
		align-items: center;
	}

	.right-column img {
		object-fit: scale-down;
	}

	.color {
		background-color: #292a34;
	}

	.drop-zone {
		border-color: #514bcf;
		border-style: dotted;
	}
</style>
