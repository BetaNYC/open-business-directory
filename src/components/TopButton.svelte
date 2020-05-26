<script>
    let scrollY
    let innerHeight

    function scrollTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={innerHeight}/>

{#if scrollY + innerHeight > document.body.offsetHeight + 30}
    <button class="button is-rounded" on:click={scrollTop}>
        <span class="material-icons">keyboard_arrow_up</span>
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