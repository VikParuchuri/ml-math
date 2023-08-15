<script>
	import Graph from '$components/Graph.svelte'
    import Header from '$components/Header.svelte'
    import Description from '$components/Description.svelte'

	import topics from '$lib/assets/topics.json'
	import relations from '$lib/assets/relations.json'
</script>

<div class="grid grid-cols-1 lg:grid-cols-5">
    <div class="prose prose-slate">
        <Header/>
        <Description/>
    </div>
    <div class="lg:col-span-4" style="overflow: hidden;">
        <Graph {topics} {relations}/>
    </div>
</div>