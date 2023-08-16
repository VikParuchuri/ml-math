<script>
    import { currentTopic } from '$stores/current_topic.ts'
</script>

<div class="prose">
    <h1 class="pb-0 mb-0">Math for ML</h1>
    <p class="pt-0 mt-0">Project by <a href="https://www.eleuther.ai/">EleutherAI</a> - read more <a href="/about">here</a>.</p>
    {#if !$currentTopic}
        <p>The graph visualization shows the math skills you need to do machine learning work.</p>
        <p>Click on a topic to learn more about it.</p>
    {/if}
</div>