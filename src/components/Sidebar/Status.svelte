<script>
    export let status

    $: isOpened = status.toLowerCase().includes('open')
</script>

{#if isOpened}
    <span class="tag is-success is-medium">{status}</span>
{:else}
    <span class="tag is-warning is-medium">{status}</span>
{/if}