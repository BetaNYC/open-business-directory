<script>
    import Legend from './map/Legend.svelte'
    import {mapObject, selectedItem, filters, rows, filterExtent} from '../stores'
    import {styles} from '../constants'
    import {onMount} from 'svelte'

    let map
    let container;
    let loaded = false
    let popup
    let previousSelectedItem
    let lastFeature

    //filter using everything but map-extent
    $: items = $rows.filter(row => $filters.filter(f => f.label !== 'map-extent').every(f => f.filter(row)))

    function updateExtentFilter(filterExtent) {
        console.log('filtering')
        const features = map.queryRenderedFeatures({layers: ['markers', 'points']});

        if (features) {
            const unqiueIds = [...new Set(features.map(feature => feature.properties.id))]
            if ($filters) {
                //remove existing filter
                const _filters = $filters
                const filter = _filters.findIndex(f => f.label === 'map-extent')
                if (filter > -1) _filters.splice(filter, 1)
                if (filterExtent) {
                    //generate new filter
                    const mapExtentFilter = {
                        label: 'map-extent',
                        filter: row => unqiueIds.includes(row.id)
                    }
                    filters.set([..._filters, mapExtentFilter])
                } else {
                    filters.set(_filters)
                }
            }
        }
    }

    $: if (map && loaded) updateExtentFilter($filterExtent) //update filter when $filterExtent checkbox store changes

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
            maxZoom: 20,
            minZoom: 12
        });

        map.addControl(new mapboxgl.NavigationControl());

        // //To pan and zoom, use 2 fingers
        // map.addControl(new MultiTouch());

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

            const zoomThreshold = 16

            map.addLayer({
                id: 'points',
                type: 'circle',
                source: 'points',
                maxzoom: zoomThreshold,
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
                    'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['get', '_closed'], false],
                        0.5,
                        1
                    ],
                    'circle-opacity': [
                        'case',
                        ['boolean', ['get', '_closed'], false],
                        0.5,
                        1
                    ],
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

                popup
                        .setLngLat(coordinates)
                        .setHTML(description)
                        .addTo(map);
            })

            map.on('mousemove', 'points', e => {
                const feature = map.queryRenderedFeatures(e.point)[0];
                if (feature.properties.id !== lastFeature) {
                    lastFeature = feature.properties.id;
                    const coordinates = feature.geometry.coordinates.slice();
                    const {Name, Category, Address} = feature.properties
                    const description = `<h6>${Name}</h6><p>${Category}</p><p>${Address}</p>`
                    popup.remove();
                    popup
                            .setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map);
                }
            });

            map.on('mouseleave', 'points', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

            map.on('click', () => {
                selectedItem.select(null)
            })

            map.on('click', 'points', (e) => {
                const feature = e.features[0]
                selectedItem.select(feature.properties)
            });

            //load icon and symbol layer
            const uniqueStyleIcons = [...new Set(styles.map(style => style.icon))]

            Promise.all(
                    uniqueStyleIcons.map(icon => ({
                        url: `./icons/${icon}`,
                        id: icon
                    })).map(img => new Promise((resolve, reject) => {
                        map.loadImage(img.url, function (error, res) {
                            map.addImage(img.id, res)
                            resolve();
                        })
                    }))
            )
                    .then(() => {
                        loaded = true;

                        map.addLayer({
                            id: 'markers',
                            type: 'symbol',
                            minzoom: zoomThreshold,
                            source: 'points',
                            layout: {
                                'icon-image': ['get', 'icon'],
                                'icon-allow-overlap': true,
                                'icon-size': [
                                    'interpolate',
                                    ['exponential', 0.6],
                                    ['zoom'],
                                    15, 0.5,
                                    18, 0.8,
                                    20, 1
                                ]
                            },
                            paint: {
                                'icon-opacity': [
                                    'case',
                                    ['boolean', ['get', '_closed'], false],
                                    0.5,
                                    1
                                ]
                            }
                        });

                        map.on('mouseenter', 'markers', (e) => {
                            map.getCanvas().style.cursor = 'pointer';
                            const feature = e.features[0]
                            const coordinates = feature.geometry.coordinates.slice();
                            const {Name, Category, Address} = feature.properties
                            const description = `<h6>${Name}</h6><p>${Category}</p><p>${Address}</p>`

                            popup
                                    .setLngLat(coordinates)
                                    .setHTML(description)
                                    .addTo(map);
                        })

                        map.on('mousemove', 'markers', e => {
                            const feature = map.queryRenderedFeatures(e.point)[0];
                            if (feature.properties.id !== lastFeature) {
                                lastFeature = feature.properties.id;
                                const coordinates = feature.geometry.coordinates.slice();
                                const {Name, Category, Address} = feature.properties
                                const description = `<h6>${Name}</h6><p>${Category}</p><p>${Address}</p>`
                                popup.remove();
                                popup
                                        .setLngLat(coordinates)
                                        .setHTML(description)
                                        .addTo(map);
                            }
                        });

                        map.on('mouseleave', 'markers', () => {
                            map.getCanvas().style.cursor = '';
                            popup.remove();
                        });

                        map.on('click', 'markers', (e) => {
                            const feature = e.features[0]
                            selectedItem.select(feature.properties)
                        });

                        map.on('moveend', () => updateExtentFilter($filterExtent));

                    })
        })

        mapObject.set(map)
    })

    $: if (map && loaded) {
        const data = generateFeatures(items)
        const layer = map.getSource('points')
        if (layer) {
            layer.setData(data);
        }
    }

    $: if (map && loaded) {
        if (previousSelectedItem) {
            //remove previous selectedItem
            map.setFeatureState({source: 'points', id: previousSelectedItem.id}, {highlight: false});
        }
        if ($selectedItem) {
            map.setFeatureState({source: 'points', id: $selectedItem.id}, {highlight: true});
        }
        previousSelectedItem = $selectedItem
    }


</script>

<div id="map" bind:this={container}>
    <Legend/>
</div>

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