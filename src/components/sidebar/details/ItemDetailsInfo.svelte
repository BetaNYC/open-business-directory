<script>
    import {formatPhoneNumber, getValidUrl} from '../../../utils/textFormatting'

    export let text = ''
    export let icon = 'indeterminate_check_box'
    export let type = 'text'

</script>

{#if text.trim()}
    {#if type === 'email'}
        <p class="info">
            <span class="material-icons"><a href="mailto:{text}">{icon}</a></span>{text}
        </p>
    {:else if type === 'phone'}
        <p class="info">
            <span class="material-icons"><a href="tel:{formatPhoneNumber(text)}">{icon}</a></span>{text}
        </p>
    {:else if type === 'website'}
        <p class="info">
            <span class="material-icons"><a target="_blank" href="{getValidUrl(text)}">{icon}</a></span>{text}
        </p>
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