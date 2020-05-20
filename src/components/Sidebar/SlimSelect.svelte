<script>
    import {onMount, onDestroy} from 'svelte'
    import SlimSelect from 'slim-select'

    let select
    let slimSelect
    export let value
    export let multiple = false
    export let options = {}
    export let text

    function onChange(e) {
        if (Array.isArray(e)) {
            value = e.map(i => i.value)
        } else {
            value = e.value
        }
    }

    $: if (slimSelect && value) {
        slimSelect.set(value)
    }

    onMount(async () => {
        slimSelect = new SlimSelect({select, onChange, ...options, placeholder: `All ${text}`})
    })

    onDestroy(() => {
        if (slimSelect) slimSelect.destroy()
    })


</script>
<div class="field">
    <label class="label">Filter by {text}</label>
    <select bind:this={select} {multiple}></select>
</div>



