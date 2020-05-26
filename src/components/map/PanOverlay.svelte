<script>
    import { fade } from 'svelte/transition';
    import {_} from 'svelte-i18n'
    import {showPanOverlay} from '../../stores'

    $: console.log($showPanOverlay)
</script>
{#if $showPanOverlay}
<div class="overlay" transition:fade>{$_('map.pan')}</div>
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