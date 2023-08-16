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
</script>

<div class="relative z-10">
<Typeahead
    label="Search math concepts"
    hideLabel
    showDropdownOnFocus
    placeholder={`Search for concepts (e.g. "Calculus")`}
    data={topics}
    limit={5}
    extract={(item) => item.label}
    on:select={({ detail }) => selectTopic(detail.original.id)}
/>
</div>

<style>
    :global([data-svelte-typeahead] [data-svelte-search] input) {
        @apply block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300;
    }

    :global(ul.svelte-typeahead-list) {
        position: relative !important;
    }

</style>