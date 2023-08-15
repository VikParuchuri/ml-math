<script>
	import { onMount, setContext } from 'svelte'
	import cytoscape from 'cytoscape'
	import GraphStyles from '$components/GraphStyles.js'
    import {currentTopic} from '$stores/current_topic.ts'

	export let topics
	export let relations

	let cyInstance = null
	let innerHeight = 0
	let innerWidth = 0
	const lgBreakpoint = 1024

	let graphElement = null

	const resizeInstance = () => {
		cyInstance.resize()
		cyInstance.fit()
		cyInstance.center()
	};

	const scaleWidth = (width) => {
		let scaleFactor = 0.8
		if (width < lgBreakpoint) {
			scaleFactor = 1
		}
		return Math.floor(width * scaleFactor);
	};

	onMount(() => {
		let elements = [];
		// Add nodes
		for (let topic of topics) {
			elements.push({
				group: 'nodes',
				id: topic.name,
				data: { ...topic }
			});
		}

		// Add edges
		for (let relation of relations) {
			elements.push({
				group: 'edges',
				id: `${relation.source}-${relation.destination}`,
				data: { ...relation }
			});
		}

		cyInstance = cytoscape({
			container: graphElement,
			style: GraphStyles,
			elements: elements
		});

		cyInstance.on('click', 'node', function (evt) {
            $currentTopic = this.id()
		});

		cyInstance
			.makeLayout({
				name: 'breadthfirst',
				rankDir: 'TB',
				nodeSep: 150,
				fit: true,
				circle: true,
				spacingFactor: 1.75
			})
			.run();

		setTimeout(() => {
			resizeInstance();
		}, 100);
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth on:resize={resizeInstance} />

<div
	id="math-ml-canvas"
	bind:this={graphElement}
	style="height: {innerHeight}px; width: {scaleWidth(innerWidth)}px"
>
	{#if cyInstance}
		<slot />
	{/if}
</div>

<style>
	:global(#math-ml-canvas) {
		height: 100%;
	}

	:global(html) {
		height: 100%;
		width: 100%;
	}
</style>
