<script>
	import Graph from '$components/Graph.svelte'
    import Header from '$components/Header.svelte'
    import Description from '$components/Description.svelte'
    import Search from '$components/Search.svelte'

	import topics from '$lib/assets/topics.json'
	import relations from '$lib/assets/relations.json'

    let descriptionPanel;

    function toggleDescription() {
        if (descriptionPanel.style.transform === 'translateX(0%)') {
            descriptionPanel.style.transform = 'translateX(100%)';
        } else {
            descriptionPanel.style.transform = 'translateX(0%)';
        }
    }

    function openDescription() {
        descriptionPanel.style.transform = 'translateX(0%)';
    }
</script>

<div class="relative grid grid-cols-1 lg:grid-cols-5 overflow-y-auto overflow-x-hidden lg:overflow-hidden" >
    <div class="prose prose-slate overflow-hidden lg:overflow-y-auto p-2 lg:p-6 max-h-screen">
        <Header/>
        <Search on:selectedNode={openDescription}/>
        <div class="absolute top-0 left-0 w-full h-full bg-white transform translate-x-full transition-transform ease-in-out duration-300 overflow-hidden p-2 z-10 lg:hidden" bind:this={descriptionPanel}>
            <button class="mb-2 text-blue-500 hover:text-blue-700" on:click={() => toggleDescription()}>Close</button>
            <div>
                <Description/>
            </div>
        </div>

        <!-- Description for Larger Screens -->
        <div class="hidden lg:block overflow-hidden">
            <Description/>
        </div>
    </div>
    <div class="lg:col-span-4 overflow-hidden">
        <Graph {topics} {relations} on:selectedNode={openDescription}/>
    </div>
</div>

<style>

</style>