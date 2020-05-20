<script>
    import {selectedItem, mapObject} from '../../stores'

    export let item;

    function selectItem() {
        selectedItem.select(item, $mapObject, item.coordinates)
    }
</script>

<li on:click={selectItem}>{item.Name}</li>