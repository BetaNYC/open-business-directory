<script>
    export let status

    $: isOpened = status.toLowerCase().includes('open')
</script>

{#if isOpened}
    <p><span class="tag is-success is-medium">{status}</span></p>
{:else}
    <p><span class="tag is-warning is-medium">{status}</span></p>
{/if}