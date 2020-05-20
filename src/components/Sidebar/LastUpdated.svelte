<script>
    import {getValidUrl} from '../../utils/textFormatting'

    export let lastUpdated = ''
    export let source = ''

    $: sourceIsLink = source.includes('http')
</script>

<p class="has-text-grey-light">
    {#if sourceIsLink}
        <a href={getValidUrl(source)}>Updated: {lastUpdated}</a>
    {:else if source.trim().length > 0}
        <abbr title={source}>Updated: {lastUpdated}</abbr>
    {:else}
        Updated: {lastUpdated}
    {/if}
</p>

<style>
    a:link {
        color: #6d8dc7;
    }
</style>