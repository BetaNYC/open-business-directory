<script>
    import {selectedItem} from '../stores'
    import NameSearch from './sidebar/filters/NameSearch.svelte'
    import RowItems from './sidebar/RowItems.svelte'
    import ItemDetails from './sidebar/details/ItemDetails.svelte'
    import OtherFilters from './sidebar/filters/OtherFilters.svelte'
    import AddressSearch from './sidebar/AddressSearch.svelte'

    export let items = []
</script>

<div class="sidebar-content">
    <div class="search">
        <AddressSearch/>
        <NameSearch/>
        <OtherFilters/>
    </div>
    <div class="items">
        <RowItems {items} show={!$selectedItem}/>
        {#if $selectedItem}
            <ItemDetails/>
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
        box-shadow: 0px 0px 2px 2px rgba(128, 128, 128, 0.2);
    }
</style>