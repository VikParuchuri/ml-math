<script>
    import { currentTopic } from '$stores/current_topic.ts'
</script>

<div>
    <h1 class="pb-0 mb-0">Math for ML</h1>
    <p class="pt-0 mt-0 mb-1">Project by <a href="https://www.eleuther.ai/">EleutherAI</a> - read more <a href="/about">here</a>.</p>
    {#if !$currentTopic}
        <p class="mb-1">All the math you need for machine learning.  Click a topic to learn about it, or search below.</p>
    {/if}
</div>