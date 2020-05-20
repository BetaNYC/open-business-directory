<script>
    import {mapObject, selectedItem} from '../stores'
    import {onMount} from 'svelte'

    export let items
    let map
    let container;
    let popup
    let previousSelectedItem

    function generateFeatures(items) {
        return {
            type: 'FeatureCollection',
            features: items.map(item => {
                return {
                    type: 'Feature',
                    id: item.id,
                    geometry: {
                        type: 'Point',
                        coordinates: item.coordinates
                    },
                    properties: item
                }
            })
        }
    }

    onMount(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiemhpayIsImEiOiJjaW1pbGFpdHQwMGNidnBrZzU5MjF5MTJiIn0.N-EURex2qvfEiBsm-W9j7w';
        map = new mapboxgl.Map({
            container,
            style: 'mapbox://styles/zhik/ckacv5hvo0uvs1iqjctbbbcnv',
            center: [-73.9482, 40.7184],
            zoom: 13,
            maxZoom: 18,
            minZoom: 12
        });

        popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('load', () => {
            const data = generateFeatures(items)

            map.addSource('points', {
                type: 'geojson',
                data
            })

            map.addLayer({
                id: 'points',
                type: 'circle',
                source: 'points',
                paint: {
                    'circle-color': ['get', 'fillColor'],
                    'circle-stroke-color': [
                        'case',
                        ['boolean', ['feature-state', 'highlight'], false],
                        '#ffef78',
                        ['get', 'strokeColor']
                    ],
                    'circle-stroke-width': [
                        'case',
                        ['boolean', ['feature-state', 'highlight'], false],
                        5,
                        0.5
                    ],
                    'circle-opacity': 0.8,
                    'circle-radius': [
                        'interpolate',
                        ['exponential', .5],
                        ['zoom'],
                        14, 3,
                        16, 5,
                        18, 6
                    ]
                }
            });

            map.on('mouseenter', 'points', (e) => {
                map.getCanvas().style.cursor = 'pointer';
                const feature = e.features[0]
                const coordinates = feature.geometry.coordinates.slice();
                const {Name, Category, Address} = feature.properties
                const description = `<h6>${Name}</h6><p>${Category}</p><p>${Address}</p>`

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            })

            map.on('mouseleave', 'points', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

            map.on('click', () => {
                selectedItem.select(null)
            })

            map.on('click', 'points', (e) => {
                const feature = e.features[0]
                selectedItem.select(feature.properties, map, feature.geometry.coordinates)
            });

        })

        mapObject.set(map)
    })

    $: if (items.length && map) {
        const data = generateFeatures(items)
        const layer = map.getSource('points')
        if (layer) {
            layer.setData(data);
        }
    }

    $: if (map) {
        if (previousSelectedItem) {
            //remove previous selectedItem
            map.setFeatureState({
                source: 'points',
                id: previousSelectedItem.id
            }, {
                highlight: false
            });
        }
        if($selectedItem){
            map.setFeatureState({
                source: 'points',
                id: $selectedItem.id,
            }, {
                highlight: true
            });
        }
        previousSelectedItem = $selectedItem
    }


</script>

<div id="map" bind:this={container}></div>

<style>
    #map {
        width: 100%;
        height: 100%;
    }

    :global(.mapboxgl-popup) {
        max-width: 400px;
    }

    :global(.mapboxgl-popup-content) {
        border: 1px solid rgba(211, 211, 211, 0.5);
    }

    :global(.mapboxgl-popup-content p) {
        margin-bottom: 1px !important;
    }
</style>