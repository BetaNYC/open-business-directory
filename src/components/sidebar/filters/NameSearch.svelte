<script>
    import {rows, filters} from '../../../stores'
    import Fuse from 'fuse.js'

    export let textSearch = ''
    let value = ''
    let fuse = null

    $: if ($rows) {
        fuse = new Fuse($rows, {
            isCaseSensitive: false,
            includeMatches: true,
            minMatchCharLength: 1,
            threshold: 0.4,
            keys: [
                "Name",
                "Category",
                "Sub-Category"
            ]
        });
    }


    function _search() {
        const matchedRows = fuse.search(value);
        const matchedIds = matchedRows.map(({item}) => item.id)
        //remove existing filter
        const _filters = $filters
        const filter = _filters.findIndex(f => f.label === 'name')
        if (filter > -1) _filters.splice(filter, 1)
        //generate new filter
        const nameFilter = {
            label: 'name',
            filter: (row) => {
                if (!value.trim()) return true
                return matchedIds.includes(row.id)
            }
        }
        filters.set([..._filters, nameFilter])
    }
</script>

<div class="field">
    <label class="label">Search by name</label>
    <div class="field">
        <div class="control is-expanded">
            <input
                    id="text-input"
                    placeholder="Search here"
                    type="text"
                    name="text-input"
                    bind:value
                    autocomplete="off"
                    on:keyup="{_search}"
            />
        </div>
    </div>
</div>

<style>
    form {
        margin-bottom: 1rem;
    }

    #text-input {
        width: 100%;
        padding: 5px 5px;
        box-sizing: border-box;
        margin-bottom: 5px;
    }

    ::placeholder {
        color: rgba(77, 77, 77, 0.8) !important;
        font-size: 0.8rem !important;
        font-weight: 400;
    }
</style>