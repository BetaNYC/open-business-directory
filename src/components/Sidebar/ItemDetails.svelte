<script>
    import {selectedItem} from '../../stores'

    $: item = $selectedItem
</script>

<div>
    <button on:click={()=> selectedItem.select(null)}>back</button>
    <h3>{item.Name}</h3>
</div>
