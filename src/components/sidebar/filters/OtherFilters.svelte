<script>
    import CategoryFilters from './CategoryFilters.svelte'
    import OpenedFilter from './OpenedFilter.svelte'

    let opened = false

</script>


<button class="full" on:click={() => opened = !opened}>
    <span class="material-icons">{opened? 'expand_less' : 'expand_more'}</span>
</button>
<div class={opened ? '' : 'hidden'}>
    <CategoryFilters/>
    <OpenedFilter/>
</div>

<style>
    .full {
        display: block;
        width: 100%;
        border: 0;
        padding: 2px 10px;
    }

    .material-icons {
        font-size: 0.8em;
    }

    .hidden{
        display: none;
    }
</style>