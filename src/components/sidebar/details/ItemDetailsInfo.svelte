<script>
    import {formatPhoneNumber, getValidUrl} from '../../../utils/textFormatting'

    export let text = ''
    export let url = ''
    export let icon = 'indeterminate_check_box'
    export let type = 'text'

</script>

{#if text.trim()}
    {#if type === 'email'}
        <a href="mailto:{text}">
            <p class="info">
                <span class="material-icons">{icon}</span>{text}
            </p>
        </a>
    {:else if type === 'phone'}
        <a href="tel:{formatPhoneNumber(text)}">
            <p class="info">
                <span class="material-icons">{icon}</span>{text}
            </p>
        </a>
    {:else if type === 'website'}
        <a target="_blank" href="{getValidUrl(url)}">
            <p class="info">
                <span class="material-icons">{icon}</span>{text}
            </p>
        </a>
    {:else}
        <p class="info">
            <span class="material-icons">{icon}</span>{text}
        </p>
    {/if}
{/if}

<style>
    .info {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        margin-bottom: 5px;
    }

    .info span {
        margin-right: 10px;
    }
</style>