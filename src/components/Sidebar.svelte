<script>
    import {selectedItem} from '../stores'
    import NameSearch from './Sidebar/NameSearch.svelte'
    import CategoryFilters from './Sidebar/CategoryFilters.svelte'
    import RowItem from './Sidebar/RowItem.svelte'
    import ItemDetails from './Sidebar/ItemDetails.svelte'

    export let items = []
</script>

<div class="sidebar-content">
    <div class="search">
        <NameSearch/>
        <CategoryFilters/>
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

    .items > div {
        position: absolute;
        height: 100%;
    }

    .items > ul {
        position: absolute;
        height: 100%;
    }
</style>