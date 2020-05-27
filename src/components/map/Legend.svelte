<script>
    import {categoryGroups, styles} from '../../constants'

    let opened = true

    //group similar colors
    const groups = styles.filter(i => i[0]).reduce((groups, i) => {
        const color = i[3],
                name = i[1]
        if (!(color in groups)){
            //setup object
            groups[color] = {names: [], color}
        }

        if(!groups[color].names.includes(name)){
            //only push if unique
            groups[color].names.push(name)
        }

        return groups
    }, {})
</script>

<div class="legend" id="legend">
    <div class="legend-title">
        <h5>Legend</h5>
        <p><a href="#legend" aria-label="Hide map legend" on:click={() => opened = !opened}>{opened ? 'Hide' : 'Show'}</a></p>
    </div>
    {#if opened}
        {#each Object.values(groups) as group}
            <div class="legend-item">
                <div class="marker marker-category" style="background-color: {group.color}"></div>
                <div>{group.names.join(', ')}</div>
            </div>
        {/each}
    {/if}
</div>

<style>
    .legend {
        line-height: 18px;
        color: #212121;
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 5px 10px;
        max-width: 80%;
    }

    .legend-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .legend-title p {
        margin-left: 1rem;
    }

    .legend-item {
        letter-spacing: -0.2px;
        margin-right: 1rem;
        display: flex;
        flex-direction: row;
    }

    .legend-item .marker {
        margin-right: 1rem;
        width: 16px;
        height: 16px;
    }
</style>