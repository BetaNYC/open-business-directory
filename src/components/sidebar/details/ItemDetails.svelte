<script>
    import {selectedItem} from '../../../stores'
    import MarkdownField from './MarkdownField.svelte'
    import ItemDetailsInfo from './ItemDetailsInfo.svelte'
    import PickupDelivery from './PickupDelivery.svelte'
    import LastUpdated from './LastUpdated.svelte'
    import Status from './Status.svelte'
    import MaterialIcon from '../../MaterialIcon.svelte'

    $: item = $selectedItem

    let subCategories = []

    $: if (item) subCategories = item['Sub-Category'].split(',').filter(tag => tag.trim())

    function resetSelect() {
        selectedItem.select(null)
    }
</script>

<div class="details">
    <div class="header">
        <button class="button is-small back" on:click={resetSelect}>
            <MaterialIcon icon="keyboard_backspace"/>
        </button>
        <img class="icon" src="./icons/{item.icon}"/>
    </div>
    <div class="content">
        <h4 class="is-5 subtitle is-marginless notranslate" translate="no">{item.Name}</h4>
        <p class="address">
            <span class="notranslate" translate="no">{item.Address}</span>
            <a href="http://maps.google.com/?q={item.Address}" target="_blank">
                <MaterialIcon icon="pin_drop"/>
            </a>
        </p>
        <Status status={item.Status}/>

        <div class="category">
            <strong>{item.Category} - </strong>
            {#if subCategories.length}
                <div class="tags are-small">
                    {#each subCategories as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            {/if}
        </div>

        <ItemDetailsInfo text={item.Email} icon="email" type="email"/>
        <ItemDetailsInfo text={item.Phone} icon="local_phone" type="phone"/>
        <ItemDetailsInfo url={item['Website/Social Media']} text="Website/Instagram" icon="public" type="website"/>
        <ItemDetailsInfo url={item.Donate} text="Donate" icon="card_giftcard" type="website"/>

        <MarkdownField title="Hours" content={item.Hours}/>
        <MarkdownField title="Special Accommodation Hours" content={item['Special Accommodation Hours']}/>
<!--        <MarkdownField title="Notes" content={item.Notes}/>-->
        <hr>

        <PickupDelivery
                pickup={item['Pickup Offered']}
                delivery={item['Delivery Offered']}
                notes={item['Delivery/Pickup Notes']}
        />

        <LastUpdated lastUpdated={item['Last Updated']} source={item['Source']}/>

    </div>
</div>

<style>
    .details {
        padding-top: 10px;
        margin-left: 0.5rem;
        height: 100px;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .back {
        margin-right: 5px;
    }

    .icon {
        width: 32px;
        height: 35px;
        position: absolute;
        right: 5px;
    }

    .address {
        font-size: 0.9rem;
    }

    .category {
        display: flex;
        flex-direction: row;
    }

    .category * {
        margin-right: 5px;
    }

    .content {
        margin-top: 1rem;
    }

    .content * {
        margin-bottom: 5px;
    }

</style>