<script>
    import MaterialIcon from './MaterialIcon.svelte'

    let scrollY
    let innerHeight

    function scrollTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={innerHeight}/>

{#if scrollY + innerHeight > document.body.offsetHeight + 15}
    <button class="button is-rounded" on:click={scrollTop}>
        <MaterialIcon icon="keyboard_arrow_up"/>
    </button>
{/if}

<style>
    button {
        z-index: 2;
        position: fixed;
        bottom: 5px;
        right: 10px;
    }
</style>