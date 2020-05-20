<script>
    import {locale} from 'svelte-i18n'

    export let className = ""
    export let opened = false

    const languages = [
        {locale: 'en', text: 'English'},
        {locale: 'es', text: 'Español'}
    ]
</script>

<div class="has-text-right">
    <button class="button {className} {opened ? 'is-clicked' : ''}" on:click={()=> opened = !opened}>
        <span class="material-icons">translate</span>
    </button>
    {#if opened}
        <div class="menu">
            <div class="select is-small">
                <select name="translate-menu" id="translate-menu" on:change="{(e) => locale.set(e.target.value)}">
                    {#each languages as language}
                        <option value={language.locale}>{language.text}</option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}
</div>

<style>
    .button {
        margin-right: 0.5rem;
    }

    .menu {
        position: absolute;
        right: 2rem;
        z-index: 2;
    }

    .is-clicked {
        background-color: #ecf1f8;
    }
</style>