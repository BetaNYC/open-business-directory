import { csvParse } from 'd3-dsv'
import { styles } from '../constants'

function getColors(rows){
    //get colors and icons from constants
    return rows.map(row => {
        const lookup = styles.find(style => style[1] === row.Category)

        //defaults
        let fillColor = '#ffffff',
            strokeColor = '#999 999',
            marker = './icons/blank.png'

        if(lookup){
            fillColor = lookup[3]
            strokeColor = lookup[4]
            marker = lookup[5]
        }

        return {...row, fillColor, strokeColor, marker}
    })
}

function removeOverlap(rows){
    //create coordinates array
    const coordRows = rows.map(row => {
        const coordinates = [+row.Longitude, +row.Latitude]
        return {...row, coordinates}
    })
    //find overlapped lnglat and move them slightly depending on order
    return coordRows.map(row => {
        const digits = 4
        const lnglat1 = row.coordinates
        const lat1 = lnglat1[1].toFixed(digits);
        const lng1 = lnglat1[0].toFixed(digits);
        const overlapped = coordRows.filter(otherRows => {
            const lnglat2 = otherRows.coordinates
            const lat2 = lnglat2[1].toFixed(digits);
            const lng2 = lnglat2[0].toFixed(digits);
            return lat1 === lat2 && lng1 === lng2
        })
        if (overlapped.length > 1) {
            //move depending on the index
            const index = overlapped.indexOf(row)
            row.coordinates = lnglat1.map(i => i + index * 0.00004)
        }
        return row
    })
}


async function importData(file, store) {
    const text = await (await fetch(file)).text()
    const rows = csvParse(text)
    //filter for rows with latlng
    const filterRows = rows.filter(({Latitude, Longitude}) => +Latitude && +Longitude)

    console.log(`Imported ${filterRows.length} out of ${rows.length}. Check latlng columns, if there are missing rows.`, rows[0])

    store.set(removeOverlap(getColors(filterRows)))
}

export default importData