<script>
    import MaterialIcon from '../../MaterialIcon.svelte'
    import {filters} from '../../../stores'
    let showFilter = false
    $: filterLabel = `indoor`
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
                        return 'Indoor Seating' in row && row['Indoor Seating'].toLowerCase().includes('yes')
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
    <MaterialIcon icon="foundation" alt="Indoor Dining"/>
    <input type="checkbox" bind:checked={showFilter}>Indoor Dining
</label>

<style>
    label {
        margin-right: 1em;
    }
    input{
        margin-right: 0.5em;
    }
</style>