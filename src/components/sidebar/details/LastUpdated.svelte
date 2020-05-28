<script>
    import {getValidUrl} from '../../../utils/textFormatting'

    export let lastUpdated = ''
    export let source = ''


    $: date = new Date(lastUpdated).toLocaleString()
    $: sourceIsLink = source.includes('http')
</script>

<p class="has-text-grey-light">
    {#if sourceIsLink}
        <a href={getValidUrl(source)}>Updated: {date}</a>
    {:else if source.trim().length > 0}
        <abbr title={source}>Updated: {date}</abbr>
    {:else}
        Updated: {date}
    {/if}
</p>

<style>
    a:link {
        color: #6d8dc7;
    }
</style>