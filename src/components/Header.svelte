<script>
    import TranslationMenu from './TranslationMenu.svelte'
    import {_} from 'svelte-i18n'
    let innerWidth
    let opened = false;

</script>

<svelte:window bind:innerWidth={innerWidth}/>

<header>
    {#if innerWidth > 768}
        <h3 class="title is-3" id="title">{$_('site_header.title')}</h3>
        <TranslationMenu/>
        <p class="is-6 subtitle" id="subtitle">{@html $_('site_header.subtitle')}</p>
    {:else}
        <h3 class="title is-5" id="title">{$_('site_header.title')}</h3>
        <div class="buttons has-text-right">
            <TranslationMenu className="is-small"/>
            <button class="material-icons button is-small {opened ? 'is-clicked' : ''}" on:click={() => opened = !opened}>info</button>
        </div>
        {#if opened}
            <p class="is-6 subtitle" id="subtitle">{@html $_('site_header.subtitle')}</p>
        {/if}
    {/if}
</header>

<style>
    header {
        margin: 1em 0em;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
        #title{
            margin-bottom: 10px;
        }

        #subtitle{
            background-color: #eaeaea;
            padding: 1rem 2rem;
            z-index: 2;
        }
    }

    .is-clicked{
        background-color: #ecf1f8;
    }
</style>