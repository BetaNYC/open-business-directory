<script>
    import SlimSelect from './SlimSelect.svelte'
    import {rows, filters} from '../../../stores'
    import {categoryGroups, styles} from '../../../constants'

    let selectedCategories = []
    let categoryOptions

    let selectedSubCategories = []
    let subCategoryOptions

    $: setupCategoryOptions($rows)

    function setupCategoryOptions(rows) {
        if (rows.length > 0) {
            //reset
            selectedCategories = []
            //set up SlimSelect options
            let options = categoryGroups.reduce((groups, groupLabel) => {
                const group = {
                    label: groupLabel,
                    options: styles.filter(cat => cat[0] === groupLabel).map(cat => ({
                        text: cat[1],
                        value: cat[1],
                        innerHTML: `<span style="padding-left: 5px; border-left: 5px solid ${cat[3]};">${cat[1]}</span>`
                    }))
                }
                return [...groups, group]
            }, [])

            //get unique categories from rows
            const uniqueCategories = Array.from(new Set(rows.map(({Category}) => Category)))
            //filter for items not in groups
            const otherGroup = uniqueCategories.filter(cat => !styles.map(i => i[1]).includes(cat))

            categoryOptions = {
                data: [...options, {
                    label: 'Other',
                    options: otherGroup.map(cat => ({text: cat, value: cat}))
                }]
            }
        }
    }

    $: setupSubCategoryOptions($rows, selectedCategories)

    function setupSubCategoryOptions(rows, selectedCategories) {
        if (rows.length > 0 && selectedCategories) {
            //reset
            selectedSubCategories = []
            const subCategories = rows.filter(({Category}) => selectedCategories.includes(Category))
                    .map(c => c['Sub-Category'])
                    .reduce((a, c) => {
                        //split by comma
                        return [...a, ...c.split(',')]
                    }, [])
                    .sort((a, b) => a.localeCompare(b))
            const uniqueSubCategories = Array.from(new Set(subCategories))
            subCategoryOptions = {data: uniqueSubCategories.map(c => ({text: c, value: c}))}
        }
    }

    $: {
        if ($filters) {
            //remove existing filter
            const _filters = $filters
            const filter = _filters.findIndex(f => f.label === 'categories')
            if (filter > -1) _filters.splice(filter, 1)
            //generate new filter
            const categoryFilter = {
                label: 'categories',
                filter: (row) => {
                    if (selectedCategories.length) {
                        if (selectedSubCategories.length) {
                            return selectedCategories.includes(row.Category) && selectedSubCategories.includes(row['Sub-Category'])
                        } else {
                            return selectedCategories.includes(row.Category)
                        }
                    } else {
                        return true
                    }
                }
            }
            filters.set([..._filters, categoryFilter])
        }
    }

</script>

{#if categoryOptions && 'data' in categoryOptions}
    <SlimSelect bind:value={selectedCategories} options={categoryOptions} multiple={true} text="Categories"/>
{/if}

{#if subCategoryOptions && 'data' in subCategoryOptions && subCategoryOptions.data.length}
    <SlimSelect bind:value={selectedSubCategories} options={subCategoryOptions} multiple={true}
                text="Sub-Categories"/>
{/if}


<style>
    :global(.ss-value) {
        background-color: #878787 !important;
        font-weight: 500;
    }

    :global(span.ss-disabled) {
        font-size: 0.8em !important;
        color: rgba(113, 113, 113, 0.8) !important;
    }
</style>