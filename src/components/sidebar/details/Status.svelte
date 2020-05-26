<script>
    export let status

    $: isOpened = status.toLowerCase().includes('open')
</script>

{#if isOpened}
    <p><span class="tag is-success is-medium">{status.toUpperCase()}</span></p>
{:else}
    <p><span class="tag is-warning is-medium">{status.toUpperCase()}</span></p>
{/if}

<style>
    .tag{
        margin-top: 0.5rem;
    }
</style>