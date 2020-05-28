<script>
    import MaterialIcon from './MaterialIcon.svelte'
    import {onDestroy} from 'svelte'

    export let className = ""
    export let opened = false

</script>

<svelte:head>
    <script type="text/javascript">
        window.translateElement = null

        function googleTranslateElementInit() {
            if (window.translateElement) return
            window.translateElement = google.translate.TranslateElement(
                {pageLanguage: 'en'},
                'google_translate_element'
            );
        }
    </script>

    <script type="text/javascript"
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</svelte:head>

<div class="has-text-right translation-menu">
    <button class="button {className} {opened ? 'is-clicked' : ''}" on:click={()=> opened = !opened}>
        <MaterialIcon icon="translate"/>
    </button>
    <div id="google_translate_element" class="menu {opened ? '' : 'is-hidden'}"></div>
</div>

<style>
    .button {
        margin-right: 0.5rem;
    }

    .menu {
        position: absolute;
        right: 2rem;
        z-index: 2;
        background-color: rgba(239, 239, 239, 1);
        padding: 0.2rem 1rem;
    }

    .is-clicked {
        background-color: #ecf1f8;
    }

    .translation-menu {
        z-index: 3;
    }
</style>