<script>
    import {selectedItem} from '../stores'
    import NameSearch from './sidebar/filters/NameSearch.svelte'
    import RowItem from './sidebar/RowItem.svelte'
    import ItemDetails from './sidebar/details/ItemDetails.svelte'
    import OtherFilters from "./sidebar/filters/OtherFilters.svelte";

    export let items = []
</script>

<div class="sidebar-content">
    <div class="search">
        <NameSearch/>
        <OtherFilters/>
    </div>
    <div class="items">
        {#if $selectedItem}
            <ItemDetails/>
        {:else}
            <ul>
                {#each items as item (item.id)}
                    <RowItem {item}/>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    .sidebar-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }


    .items {
        margin-top: 1rem;
        flex: 0 1 auto;
        position: relative;
        height: inherit;
        overflow: auto;
    }


    .items > * {
        position: absolute;
        height: 100%;
    }
</style>