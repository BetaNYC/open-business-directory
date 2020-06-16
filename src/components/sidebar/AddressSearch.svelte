<script>
    import {mapObject, filterExtent} from '../../stores'

    let value = ''
    let searchAddrs = []
    let error = false

    let markerLayer = null;

    function _set(addr) {
        //set value to clicked addr , then clear searchAddrs
        if (typeof addr === 'string') {
            value = addr
        }
        searchAddrs = []
        fetch(`https://geosearch.planninglabs.nyc/v1/autocomplete?text=${value}&size=1`)
                .then(response => response.json())
                .then(response => {
                    //use the first address
                    if (response.features.length > 0) {
                        const coords = response.features[0].geometry.coordinates

                        $mapObject.flyTo({center: coords, zoom: 15.5})

                        //add marker to map
                        if (!markerLayer) {
                            markerLayer = new mapboxgl.Marker().setLngLat(coords)
                            markerLayer.addTo($mapObject);
                        } else {
                            markerLayer = new mapboxgl.Marker().setLngLat(coords)
                        }

                    } else {
                        //throw error
                        error = true
                    }
                })
    }

    function _search() {
        if (value.length > 1) {
            fetch(`https://geosearch.planninglabs.nyc/v1/autocomplete?text=${value}, Manhattan&size=5`)
                    .then(response => response.json())
                    .then(
                            response => {
                                searchAddrs = response.features
                                        .map(feature =>
                                                feature.properties.label.replace(', New York, NY, USA', '')
                                        )
                                        .slice(0, 5)
                                if (searchAddrs.length > 0) {
                                    error = false
                                }
                            }
                    )
        } else {
            searchAddrs = []
        }
    }
</script>

<form on:submit|preventDefault="{_set}">
    <div class="field">
        <label class="label">Search an Address</label>
        <div class="field">
            <div class="control is-expanded">
                <input
                        id="address"
                        placeholder="240 Division Ave"
                        type="text"
                        name="address"
                        bind:value
                        autocomplete="off"
                        on:keyup="{() => {_search()}}"
                        class="{!error ? 'input is-fullwidth' : 'input is-fullwidth is-danger'}"
                />
            </div>
        </div>
    </div>

    {#if error}
        <p class="help is-danger">
            No addresses found
        </p>
    {/if}

    <ul>
        {#each searchAddrs as addr}
            <li lass="is-hoverable" on:click="{() => _set(addr)}">{addr}</li>
        {/each}
    </ul>
    <div class="field">
        <label class="checkbox">
            <input type="checkbox" bind:checked={$filterExtent}>Search within map extent
        </label>
    </div>
</form>

<style>
    form {
        margin-bottom: 1rem;
    }

    #address {
        width: 100%;
        padding: 0px 10px;
        box-sizing: border-box;
        margin-bottom: 5px;
    }

    input[type='submit'] {
        background-color: #6a6a6a;
        border: none;
        color: white;
        padding: 5px 10px;
        text-decoration: none;
        cursor: pointer;
    }

    ul {
        color: rgb(61, 61, 61);
        background-color: #ffffff;
        width: 100%;
        position: absolute;
        z-index: 2;
        margin: 0px !important;

    }

    li {
        margin-left: 5px;
        list-style-type: none;
    }

    li:hover {
        background-color: #f1f1f1;
    }

    ::placeholder {
        color: rgba(77, 77, 77, 0.8) !important;
        font-size: 0.8rem !important;
        font-weight: 400;
    }

    label {
        margin-right: 1em;
    }

    input{
        margin-right: 0.5em;
    }
</style>