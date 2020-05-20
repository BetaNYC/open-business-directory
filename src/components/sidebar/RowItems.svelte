<script>
    import {selectedItem, mapObject} from '../../stores'

    export let items;

    function selectItem(item) {
        selectedItem.select(item, $mapObject, item.coordinates)
    }
</script>

<ul>
    {#each items as item (item.id)}
        <li role="listitem" tabindex="-1" on:click={() => selectItem(item)}>{item.Name}</li>
    {/each}
</ul>


<style>
    ul{
        position: absolute;
        height: 100%;
    }
</style>