<script>
    import MarkdownField from './MarkdownField.svelte'

    export let pickup
    export let delivery
    export let notes
</script>


<div class="field is-grouped is-grouped-multiline">
    <div class="control">
        <div class="tags has-addons">
            <span class="tag"><strong>Pickup</strong></span>
            <span class="tag {pickup.toLowerCase().includes('yes') ? 'is-success' : 'is-white'}">
                {pickup}
            </span>
        </div>
    </div>


    <div class="control">
        <div class="tags has-addons">
            <span class="tag"><strong>Delivery</strong></span>
            <span class="tag {delivery.toLowerCase().includes('yes') ? 'is-success' : 'is-white'}">
                {delivery}
            </span>
        </div>
    </div>
</div>
<MarkdownField title="Delivery/Pickup Notes" content={notes}/>