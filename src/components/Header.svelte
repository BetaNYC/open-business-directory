<script>
    import TranslationMenu from './TranslationMenu.svelte'
    import MaterialIcon from './MaterialIcon.svelte'

    let innerWidth
    let opened = false;

</script>

<svelte:window bind:innerWidth={innerWidth}/>

<header>
    {#if innerWidth > 768}
        <div class="header-bar">
            <h3 class="title is-3" id="title">Essentially Open North Brooklyn</h3>
            <div class="buttons has-text-right">
                <TranslationMenu className="is-small"/>
                <button class="button is-small {opened ? 'is-clicked' : ''}" on:click={() => opened = !opened}>
                    <MaterialIcon icon="info"></MaterialIcon>
                </button>
            </div>
        </div>
        {#if opened}
            <div id="subtitle">
                <p class="is-6 subtitle"><strong>Community mapping of Greenpoint and Williamsburg businesses operating
                    during the COVID-19 crisis.</strong>
                    <br/><br/>We are updating these listings regularly, but please check their Instagram, website, or
                    call for
                    the most current information.</p>
                <p class="is-6 subtitle">Maintained by <a href="http://northbrooklynneighbors.org/">North Brooklyn
                    Neighbors</a> and
                    <a href="http://northbrooklynmutualaid.org/">North Brooklyn Mutual Aid</a>.
                    To add or update info fill out <a href="https://airtable.com/shrGc92OIWFQoSf5X" target="_blank">this
                        form</a>.</p>
            </div>
        {/if}
    {:else}
        <div class="header-bar">
            <h3 class="title is-5">Essentially Open North Brooklyn</h3>
            <div class="buttons has-text-right">
                <TranslationMenu className="is-small"/>
                <button class="button is-small {opened ? 'is-clicked' : ''}" on:click={() => opened = !opened}>
                    <MaterialIcon icon="info"></MaterialIcon>
                </button>
            </div>
        </div>
        {#if opened}
            <div id="subtitle">
                <p class="is-6 subtitle"><strong>Community mapping of Greenpoint and Williamsburg businesses operating
                    during the COVID-19 crisis.</strong>
                    <br/><br/>We are updating these listings regularly, but please check their Instagram, website, or
                    call for
                    the most current information.</p>
                <p class="is-6 subtitle">Maintained by <a href="http://northbrooklynneighbors.org/">North Brooklyn
                    Neighbors</a> and
                    <a href="http://northbrooklynmutualaid.org/">North Brooklyn Mutual Aid</a>.
                    To add or update info fill out <a href="https://airtable.com/shrGc92OIWFQoSf5X" target="_blank">this
                        form</a>.</p>
            </div>
        {/if}
    {/if}
</header>

<style>
    .header-bar {
        margin: 1rem 0rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .title {
        margin-bottom: 10px !important;
    }

    .has-background-warning{
        padding: 0.2rem 1rem ;
    }

    @media only screen and (max-width: 768px) {

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