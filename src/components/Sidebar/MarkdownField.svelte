<script>
    import marked from 'marked';
    import DOMPurify from 'dompurify'

    export let title = ''
    export let content = ''
    $: isEmpty = !content || content.trim().length === 0

</script>

{#if !isEmpty}
    <p><strong>{title}: </strong>{@html DOMPurify.sanitize(marked(content))}</p>
{/if}