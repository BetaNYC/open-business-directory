<script>
    import {filters} from '../../../stores'

    let showOpened = false

    $: updateFilter(showOpened)

    function updateFilter(showOpened) {
        if ($filters) {
            //remove existing filter
            const _filters = $filters
            const filter = _filters.findIndex(f => f.label === 'opened')
            if (filter > -1) _filters.splice(filter, 1)
            if (showOpened) {
                //generate new filter
                const openedFilter = {
                    label: 'opened',
                    filter: (row) => !row._closed
                }
                filters.set([..._filters, openedFilter])
            } else {
                filters.set(_filters)
            }
        }
    }
</script>
<div class="field">
    <label class="label">Status</label>
    <label class="checkbox">
        <input type="checkbox" bind:checked={showOpened}>Hide closed listings
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