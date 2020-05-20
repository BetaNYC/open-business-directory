<script>
    import {selectedItem} from '../../../stores'
    import MarkdownField from './MarkdownField.svelte'
    import ItemDetailsInfo from './ItemDetailsInfo.svelte'
    import TakeoutDelivery from './TakeoutDelivery.svelte'
    import LastUpdated from './LastUpdated.svelte'
    import Status from './Status.svelte'

    $: item = $selectedItem

    let subCategories = []

    $: if (item) subCategories = item['Sub-Category'].split(',').filter(tag => tag.trim())

</script>

<div class="details">
    <div class="header">
        <button class="button is-small back" on:click={()=> selectedItem.select(null)}>
            <span class="material-icons">keyboard_backspace</span>
        </button>
        <span class="title">
            <h4 class="is-5 subtitle is-marginless">{item.Name}</h4>
            <img class="icon" src="./icons/{item.icon}"/>
       </span>
    </div>
    <div class="content">
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

        <p class="address">
            <a class="has-text-grey-light" href="http://maps.google.com/?q={item.Address}"
               target="_blank">{item.Address}</a>
        </p>


        <ItemDetailsInfo text={item.Email} icon="email" type="email"/>
        <ItemDetailsInfo text={item.Phone} icon="local_phone" type="phone"/>
        <ItemDetailsInfo text={item['Website/Social Media']} icon="public" type="website"/>
        <ItemDetailsInfo text={item.Donate} icon="card_giftcard" type="website"/>

        <MarkdownField title="Hours" content={item.Hours}/>
        <MarkdownField title="Special Accommodation Hours" content={item['Special Accommodation Hours']}/>
        <MarkdownField title="Notes" content={item.Notes}/>
        <hr>

        <TakeoutDelivery
                pickup={item['Pickup Offered']}
                delivery={item['Delivery Offered']}
                notes={item['Delivery/Pickup Notes']}
        />

        <LastUpdated lastUpdated={item['Last Updated']} source={item['Source']}/>

    </div>
</div>

<style>
    .details {
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

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .icon {
        width: 32px;
        height: 35px;
        position: absolute;
        right: 0;
    }

    .address {
        font-size: 0.9rem;
    }

    .category{
        display: flex;
        flex-direction: row;
    }

    .category *{
        margin-right: 5px;
    }

    .content {
        margin-top: 1rem;
    }

    .content * {
        margin-bottom: 5px;
    }

</style>