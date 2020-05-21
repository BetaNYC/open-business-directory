<script>
    import {filters} from '../../../stores'

    let showAll = true
    let showPickup = false
    let showDelivery = false


    function changeShowAll(){
        if(showAll){
            showPickup = false
            showDelivery = false
        }
    }

    function clearShowAll(){
        //clear show all when pickup or delivery is checked
        if(showPickup || showDelivery) showAll = false
        if(!showPickup && !showPickup) showAll = true
    }

    $: updateFilter(showAll, showPickup, showDelivery)

    function updateFilter(showAll, showPickup, showDelivery) {
        if ($filters) {
            //remove existing filter
            const _filters = $filters
            const filter = _filters.findIndex(f => f.label === 'pickup-delivery')
            if (filter > -1) _filters.splice(filter, 1)
            if (!showAll) {
                //generate new filter
                const pickupDeliveryFilter = {
                    label: 'pickup-delivery',
                    filter: (row) => {
                        let bool = true
                        if(showPickup){
                            bool = bool && row['Pickup Offered'].toLowerCase().includes('yes')
                        }
                        if(showDelivery){
                            bool = bool && row['Delivery Offered'].toLowerCase().includes('yes')
                        }
                        return bool
                    }
                }
                filters.set([..._filters, pickupDeliveryFilter])
            } else {
                filters.set(_filters)
            }
        }
    }
</script>

<div class="field">
    <label class="label">Pickup/Delivery</label>
    <label class="checkbox">
        <input type="checkbox" bind:checked={showAll} on:change={changeShowAll}>All
    </label>
    <label class="checkbox">
        <input type="checkbox" bind:checked={showPickup} on:change={clearShowAll}>Pickup
    </label>
    <label class="checkbox">
        <input type="checkbox" bind:checked={showDelivery}  on:change={clearShowAll}>Delivery
    </label>
</div>


<style>
    label {
        margin-right: 1em;
    }

    input{
        margin-right: 0.5em;
    }
</style>