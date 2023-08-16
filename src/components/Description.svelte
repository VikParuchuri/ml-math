<script>
	import { onMount, onDestroy } from 'svelte'

	import topics from '$lib/assets/topics.json'
	import resources from '$lib/assets/resources.json'
	import { currentTopic } from '$stores/current_topic.ts'
	import TopicBadge from '$components/TopicBadge.svelte'
	import Resources from '$components/Resources.svelte'

	let topicInfo = {}
	let relevantResources = []
	let relevantApplications = []
	let descriptionRef
	let unsubscribe

	const renderMarkdown = () => {
		topicInfo = {}
		relevantResources = []
		relevantApplications = []

		if ($currentTopic === '') {
			return
		}

		for (let topic of topics) {
			if (topic.id === $currentTopic) {
				topicInfo = structuredClone(topic)
                break
			}
		}

		for (let resource of resources) {
			if (resource.topics === $currentTopic) {
				if (resource.category == "Application"){
					relevantApplications.push(resource)
				} else {
					relevantResources.push(resource)
				}
				
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

{#if $currentTopic}
<div class="z-20" bind:this={descriptionRef}>
	{#if Object.keys(topicInfo).length > 0}
		<h2 class="mt-2">{topicInfo.label}</h2>
		<div class="not-prose">
			<TopicBadge type={topicInfo.type}>{topicInfo.type}</TopicBadge>
		</div>
		{#if topicInfo.description}
			<h3>Description</h3>
			<p>{topicInfo.description}</p>
		{/if}
	{/if}

	<div>
		<Resources
		title={`Applications of ${topicInfo.label}`}
		resources={relevantApplications}
		/>

		<Resources
		title={`Learning Resources`}
		resources={relevantResources}
		/>

		{#if Object.keys(topicInfo).length > 0 && topicInfo.keywords}
			<h3>Keywords</h3>
			<p>{topicInfo.keywords}</p>
		{/if}

		<p class="text-sm">Want to contribute?  Submit a <a href="https://github.com/VikParuchuri/ml-math">PR</a>.</p>
	</div>
</div>
{/if}
