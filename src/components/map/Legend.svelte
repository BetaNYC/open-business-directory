<script>
    import {categoryGroups, styles} from '../../constants'

    let opened = localStorage.getItem('header') === null ? true : JSON.parse(localStorage.getItem('header'));

    function toggleOpen(){
        //toggle and save to local storage
        opened = !opened
        localStorage.setItem('header', opened)
    }

    //group similar colors
    const groups = styles.filter(i => i.group).reduce((groups, i) => {
        const color = i.fillColor,
                name = i.categoryName
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
        <p><a href="#legend" aria-label="Hide map legend" on:click={toggleOpen}>{opened ? 'Hide' : 'Show'}</a></p>
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
        right: 5px;
        bottom: 30px;
        z-index: 200;
        border-radius: 3px;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 1px 2px rgba(136, 136, 136, 0.6);
        padding: 5px 5px;
        margin-bottom: 0px;
        max-width: 80%;
    }
    .legend-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .legend-title p{
        margin-bottom: 0;
    }
    .legend-title h5{
        margin-right: 1rem;
        margin-bottom: 0;
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