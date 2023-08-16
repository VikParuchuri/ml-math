<script>
	import { onDestroy } from 'svelte'

	import topics from '$lib/assets/topics.json'
	import resources from '$lib/assets/resources.json'
	import { currentTopic } from '$stores/current_topic.ts'
	import TopicBadge from '$components/TopicBadge.svelte'

	let topicInfo = {}
	let relevantResources = []

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
	}

	const unsubscribe = currentTopic.subscribe((value) => {
		renderMarkdown()
	})

	onDestroy(unsubscribe)
</script>

{#if Object.keys(topicInfo).length > 0}
    <h2>{topicInfo.label}</h2>
	<div class="not-prose">
		<TopicBadge type={topicInfo.type}>{topicInfo.type}</TopicBadge>
	</div>
    <h3>Description</h3>
    <p>{topicInfo.description}</p>
{:else}
    <p>The graph visualization shows the math skills you need to do machine learning work.</p>
	<p>Click on a topic to learn more about it.</p>
{/if}

{#if relevantResources.length > 0}
    <h3>Resources</h3>
    <ul>
    {#each relevantResources as resource}
        <li><a href={resource.url} target="_blank">{resource.title}</a></li>
    {/each}
    </ul>
{/if}

{#if Object.keys(topicInfo).length > 0}
	<h3>Keywords</h3>
	<p>{topicInfo.keywords}</p>
{/if}

