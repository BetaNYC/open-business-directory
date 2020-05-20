<script>
    import {filters} from '../../../stores'

    let showOpened = false

    $: updateFilter(showOpened)

    function updateFilter(showOpened){
        if($filters){
            //remove existing filter
            const _filters = $filters
            const filter = _filters.findIndex(f => f.label === 'opened')
            if (filter > -1) _filters.splice(filter, 1)
            if(showOpened){
                //generate new filter
                const openedFilter = {
                    label: 'opened',
                    filter: (row) => !row._closed
                }
                filters.set([..._filters, openedFilter])
            }else{
                filters.set(_filters)
            }
        }
    }
</script>


    <label class="checkbox">
        <input type="checkbox" bind:checked={showOpened}>Only show open listings
    </label>

<style>
    label{
        padding: 2px 10px;
        background-color: #f1f1f1;
    }
    input{
        margin-right: 1em;
    }
</style>