<script>
    export let status

    $: isOpened = status.toLowerCase().includes('open')
</script>

{#if isOpened}
    <span class="tag is-success">{status}</span>
{:else}
    <span class="tag is-white">{status}</span>
{/if}