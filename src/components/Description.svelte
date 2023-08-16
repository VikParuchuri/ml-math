<script>
	import { onMount, onDestroy } from 'svelte'

	import topics from '$lib/assets/topics.json'
	import resources from '$lib/assets/resources.json'
	import { currentTopic } from '$stores/current_topic.ts'
	import TopicBadge from '$components/TopicBadge.svelte'

	let topicInfo = {}
	let relevantResources = []
	let descriptionRef
	let unsubscribe

	const renderMarkdown = () => {
		topicInfo = {}
		relevantResources = []

		if ($currentTopic === '') {
			return
		}

		for (let topic of topics) {
			if (topic.id === $currentTopic) {
				topicInfo = structuredClone(topic)
                if (!topic.description) {
                    topicInfo.description = 'No description available.'
                }
                break
			}
		}

		for (let resource of resources) {
			if (resource.topics === $currentTopic) {
				relevantResources.push(resource)
			}
		}

		window.scrollTo(0, 0)
		if (descriptionRef) {
			descriptionRef.scrollTo(0, 0)
		}
	}

	onMount(() => {
		unsubscribe = currentTopic.subscribe((value) => {
			renderMarkdown()
		})
	})

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe()
		}
	})
</script>

<div class="z-20">
	{#if Object.keys(topicInfo).length > 0}
		<h2 class="mt-2">{topicInfo.label}</h2>
		<div class="not-prose">
			<TopicBadge type={topicInfo.type}>{topicInfo.type}</TopicBadge>
		</div>
		<h3>Description</h3>
		<p>{topicInfo.description}</p>
	{/if}

	<div bind:this={descriptionRef}>
		{#if relevantResources.length > 0}
			<h3>Resources</h3>
			<ul>
			{#each relevantResources as resource}
				<li><a href={resource.url} target="_blank">{resource.title}</a></li>
			{/each}
			</ul>
		{/if}

		{#if Object.keys(topicInfo).length > 0 && topicInfo.keywords}
			<h3>Keywords</h3>
			<p>{topicInfo.keywords}</p>
		{/if}
	</div>
</div>

