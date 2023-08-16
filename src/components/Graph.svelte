<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'
	import cytoscape from 'cytoscape'
	import GraphStyles from '$components/GraphStyles.js'
	import { currentTopic } from '$stores/current_topic.ts'

	export let topics
	export let relations

	let unsubscribe
	const dispatch = createEventDispatcher();
	let cyInstance = null
	let innerHeight = 0
	let innerWidth = 0
	const lgBreakpoint = 1024
	let graphVisibility = 'hidden'
	let currentTopicGraph = null

	let isMobile = false

	let graphElement = null

	const resizeInstance = () => {
		isMobile = innerWidth < lgBreakpoint
		cyInstance.resize()
		cyInstance.fit()
		cyInstance.center()
	}

	const scaleWidth = (width) => {
		let scaleFactor = 0.8
		if (isMobile) {
			scaleFactor = 1
		}
		return Math.floor(width * scaleFactor)
	}

	const scaleHeight = (height, width) => {
		let scaleFactor = .825
		if (!isMobile) {
			scaleFactor = 1
		}
		return Math.floor(height * scaleFactor)
	}

	const handleNodeSelection = (node) => {
		cyInstance.edges('.highlighted').removeClass('highlighted')
		node.connectedEdges().addClass('highlighted')
	}

	onMount(() => {
		isMobile = innerWidth < lgBreakpoint
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
			minZoom: isMobile ? .2 : 0.3,
			maxZoom: 1,
			boxSelectionEnabled: false,
			autoungrabify: true,
		})

		cyInstance.on('tap', 'node', function (evt) {
			currentTopicGraph = this.id()
			$currentTopic = this.id()
			dispatch('selectedNode')
			handleNodeSelection(evt.target)
		})

		cyInstance.on('tap', function(evt){
			if( evt.target === cyInstance ){
				cyInstance.edges('.highlighted').removeClass('highlighted')
				$currentTopic = ""
			}
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

	onMount(() => {
		unsubscribe = currentTopic.subscribe((value) => {
		if (value !== currentTopicGraph && value) {
				currentTopicGraph = value
				let node = cyInstance.getElementById(value)
				
				// Unselect all nodes, and select current node
				cyInstance.nodes().unselect()
				node.select()
				
				// Center current node
				cyInstance.center(node)

				// Select edges for node
				handleNodeSelection(node)
			}
		})
	})

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe()
		}
	})
</script>

<svelte:window bind:innerHeight bind:innerWidth on:resize={resizeInstance} />

<div
	id="math-ml-canvas"
	bind:this={graphElement}
	style="height: {scaleHeight(innerHeight, innerWidth)}px; width: {scaleWidth(innerWidth)}px; visibility: {graphVisibility};"
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
