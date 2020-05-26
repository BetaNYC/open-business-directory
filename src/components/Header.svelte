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
        <p class="is-6 subtitle" id="subtitle">{@html $_('site_header.subtitle2')}</p>
    {:else}
        <div id="title">
            <h3 class="title is-5">{$_('site_header.title')}</h3>
            <div class="buttons has-text-right">
                <TranslationMenu className="is-small"/>
                <button class="material-icons button is-small {opened ? 'is-clicked' : ''}"
                        on:click={() => opened = !opened}>info
                </button>
            </div>
        </div>
        {#if opened}
            <div id="subtitle">
                <p class="is-6 subtitle">{@html $_('site_header.subtitle')}</p>
                <p class="is-6 subtitle">{@html $_('site_header.subtitle2')}</p>
            </div>
        {/if}
    {/if}
</header>

<style>
    header {
        margin: 1rem 0rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
        .title {
            margin-bottom: 10px;
        }

        #title{
            min-height: 5rem;
        }

        #subtitle {
            margin-top: 5px;
            background-color: #eaeaea;
            padding: 1rem 2rem;
            z-index: 2;
        }
    }

    .is-clicked {
        background-color: #ecf1f8;
    }

    p {
        margin-bottom: 0.25rem !important;
    }
</style>