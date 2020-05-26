<script>
    import CategoryFilters from './CategoryFilters.svelte'
    import OpenedFilter from './OpenedFilter.svelte'
    import PickupDeliveryFilter from './PickupDeliveryFilter.svelte'

    let opened = false

</script>


<button class="full" on:click={() => opened = !opened}>
    More Filters <span class="material-icons">{opened? 'expand_less' : 'expand_more'}</span>
</button>
<div class={opened ? '' : 'hidden'}>
    <CategoryFilters/>
    <OpenedFilter/>
    <PickupDeliveryFilter/>
</div>

<style>
    .full {
        display: block;
        width: 100%;
        border: solid 1px #d5d5d5;
        border-radius: 4px;
        padding: 5px 10px;
    }

    .material-icons {
        font-size: 0.8em;
    }

    .hidden{
        display: none;
    }
</style>