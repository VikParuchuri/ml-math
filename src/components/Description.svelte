<script>
	import { onDestroy } from 'svelte';

	import topics from '$lib/assets/topics.json';
	import resources from '$lib/assets/resources.json';
	import { currentTopic } from '$stores/current_topic.ts';

    let topicName = ''
	let description = ''
	let relevantResources = []

	const renderMarkdown = () => {
		description = ''
		relevantResources = []

		if ($currentTopic === '') {
			return;
		}

		for (let topic of topics) {
			if (topic.id === $currentTopic) {
                if (topic.description) {
				    description = topic.description
                } else {
                    description = 'No description available.'
                }
                topicName = topic.label
                break
			}
		}

		for (let resource of resources) {
			if (resource.topics === $currentTopic) {
				relevantResources.push(resource);
			}
		}
	};

	const unsubscribe = currentTopic.subscribe((value) => {
		renderMarkdown();
	});

	onDestroy(unsubscribe);
</script>

{#if topicName}
    <h2>{topicName}</h2>
{/if}

{#if description}
    <h3>Description</h3>
    <p>{description}</p>
{:else}
    <p>Welcome to the Math for ML skill tree.  Please click on a node to see a description.</p>
{/if}

{#if relevantResources.length > 0}
    <h3>Resources</h3>
    <ul>
    {#each relevantResources as resource}
        <li><a href={resource.url} target="_blank">{resource.title}</a></li>
    {/each}
    </ul>
{/if}

