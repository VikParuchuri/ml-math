<script>
    export let title = ""
    export let subheader = ""
    export let resources = []
</script>

{#if resources.length > 0}
    <h3 class="mb-1">{title}</h3>
    <ul>
    {#each resources as resource}
        <li><a href={resource.url} target="_blank">{resource.title}</a></li>
    {/each}
    </ul>
{/if}