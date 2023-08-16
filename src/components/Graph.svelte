<script>
	import { onMount, setContext } from 'svelte'
	import cytoscape from 'cytoscape'
	import GraphStyles from '$components/GraphStyles.js'
	import { currentTopic } from '$stores/current_topic.ts'

	export let topics
	export let relations

	let cyInstance = null
	let innerHeight = 0
	let innerWidth = 0
	const lgBreakpoint = 1024
	let graphVisibility = 'hidden'

	let graphElement = null

	const resizeInstance = () => {
		cyInstance.resize()
		cyInstance.fit()
		cyInstance.center()
	}

	const scaleWidth = (width) => {
		let scaleFactor = 0.8
		if (width < lgBreakpoint) {
			scaleFactor = 1
		}
		return Math.floor(width * scaleFactor)
	}

	const handleNodeSelection = (node) => {
		cyInstance.edges('.highlighted').removeClass('highlighted')
		node.connectedEdges().addClass('highlighted')

		setTimeout(() => {
			cyInstance.resize()
		}, 100)
	}

	onMount(() => {
		let elements = []
		// Add nodes
		for (let topic of topics) {
			elements.push({
				group: 'nodes',
				id: topic.name,
				data: { ...topic }
			})
		}

		// Add edges
		for (let relation of relations) {
			elements.push({
				group: 'edges',
				id: `${relation.source}-${relation.destination}`,
				data: { ...relation }
			})
		}

		cyInstance = cytoscape({
			container: graphElement,
			style: GraphStyles,
			elements: elements,
			minZoom: 0.2,
			maxZoom: 2,
			boxSelectionEnabled: false
		})

		cyInstance.on('click', 'node', function (evt) {
			$currentTopic = this.id()
			handleNodeSelection(evt.target)
		})

		cyInstance.on('tap', 'node', function (evt) {
			$currentTopic = this.id()
			handleNodeSelection(evt.target)
		})
		
		cyInstance
			.makeLayout({
				name: 'breadthfirst',
				fit: true,
				circle: true,
				spacingFactor: 1.5
			})
			.run()

		setTimeout(() => {
			resizeInstance()
			graphVisibility = 'visible'
		}, 100)
	})
</script>

<svelte:window bind:innerHeight bind:innerWidth on:resize={resizeInstance} />

<div
	id="math-ml-canvas"
	bind:this={graphElement}
	style="height: {innerHeight}px; width: {scaleWidth(innerWidth)}px; visibility: {graphVisibility};"
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
