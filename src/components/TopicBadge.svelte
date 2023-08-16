<script>
    export let type = 'Niche'
</script>

<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-slate-950 ring-1 ring-inset" class:light={type == 'Niche'} class:medium={type == 'Useful'} class:dark={type == 'Important'}><slot></slot></span>

<style>
.light {
    @apply bg-indigo-50 ring-indigo-500/10;
}

.medium {
    @apply bg-indigo-100 ring-indigo-500/10;
}

.dark {
    @apply bg-indigo-300 ring-indigo-500/10;
}
</style>