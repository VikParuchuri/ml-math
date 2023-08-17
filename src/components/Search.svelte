<script>
    import {createEventDispatcher} from 'svelte';
    import Typeahead from "svelte-typeahead";
    import { currentTopic } from '$stores/current_topic.ts'

    import topics from '$lib/assets/topics.json'

    const dispatch = createEventDispatcher();
    const selectTopic = (topicId) => {
        $currentTopic = topicId
        dispatch('selectedNode')
    }

    let topicsAndKeywords = []
    topics.forEach(topic => {
        topicsAndKeywords.push({
            id: topic.id,
            label: topic.label,
            kind: "topic"
        })
        if (topic.keywords) {
            topic.keywords.split(',').forEach(keyword => {
                topicsAndKeywords.push({
                    id: topic.id,
                    label: keyword,
                    topic: topic.label,
                    kind: "keyword"
                })
            })
        }
    })
</script>

<div class="relative z-10">
<Typeahead
    label="Search math concepts"
    hideLabel
    showDropdownOnFocus
    placeholder={`Search for concepts (e.g. "Calculus")`}
    data={topicsAndKeywords}
    limit={5}
    extract={(item) => `${item.label}`}
    let:result
    on:select={({ detail }) => selectTopic(detail.original.id)}
>
<span class:font-semibold={result.original.kind === 'topic'}>
    {@html result.string}
</span>
{#if result.original.topic}
    <div class="text-xs text-gray-500">Concept: {result.original.topic}</div>
{/if}
</Typeahead>
</div>

<style>
    :global([data-svelte-typeahead] [data-svelte-search] input) {
        @apply block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300;
    }

    :global(ul.svelte-typeahead-list) {
        position: relative !important;
    }

</style>