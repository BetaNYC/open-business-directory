<script>
    import { fade } from 'svelte/transition';
    import {showPanOverlay} from '../../stores'

    $: console.log($showPanOverlay)
</script>
{#if $showPanOverlay}
<div class="overlay" transition:fade>Use two fingers to pan on the map</div>
{/if}

<style>
    .overlay{
        position: absolute;
        background-color: rgba(0,0,0,0.6);
        color: white;
        font-size: 2rem;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        line-height: 2rem;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
</style>