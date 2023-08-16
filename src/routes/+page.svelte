<script>
	import Graph from '$components/Graph.svelte'
    import Header from '$components/Header.svelte'
    import Description from '$components/Description.svelte'

	import topics from '$lib/assets/topics.json'
	import relations from '$lib/assets/relations.json'
</script>

<div class="grid grid-cols-1 lg:grid-cols-5 overflow-y-auto overflow-x-hidden lg:overflow-hidden pe-2 lg:pe-0" >
    <div class="prose prose-slate overflow-hidden lg:overflow-y-auto p-2 lg:p-6 max-h-screen">
        <Header/>
        <Description/>
    </div>
    <div class="lg:col-span-4 overflow-hidden">
        <Graph {topics} {relations}/>
    </div>
</div>

<style>

</style>