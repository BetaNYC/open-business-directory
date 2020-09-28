<script>
    import MaterialIcon from '../../MaterialIcon.svelte'
    import {filters} from '../../../stores'
    let showFilter = false
    $: filterLabel = `outdoor`
    $: updateFilter(showFilter)
    function updateFilter(showFilter) {
        if ($filters) {
            //remove existing filter
            const _filters = $filters
            const filter = _filters.findIndex(f => f.label === filterLabel)
            if (filter > -1) _filters.splice(filter, 1)
            if (showFilter) {
                //generate new filter
                const filter = {
                    label: filterLabel,
                    filter: (row) => {
                        return row['Outdoor Space'].trim().length > 0
                    }
                }
                filters.set([..._filters, filter])
            } else {
                filters.set(_filters)
            }
        }
    }
</script>

<label class="checkbox">
    <MaterialIcon icon="deck" alt="Outdoor Space"/>
    <input type="checkbox" bind:checked={showFilter}>Outdoor Dining
</label>

<style>
    label {
        margin-right: 1em;
    }
    input{
        margin-right: 0.5em;
    }
</style>