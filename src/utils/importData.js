import {csvParse} from 'd3-dsv'
import {styles} from '../constants'

function getColors(rows) {
    //get colors and icons from constants
    return rows.map(row => {
        const subLookup = styles.find(style => {
            const subCategory = row['Sub-Category'].toLowerCase().trim()
            if(subCategory.length === 0 || !style.subcategoryName){
                return false
            }
            return style.categoryName === row.Category && subCategory.includes(style.subcategoryName)
        })
        const lookup = styles.find(style => style.categoryName === row.Category)

        //defaults
        let fillColor = '#909090',
            strokeColor = '#e8e8e8',
            icon = 'blank.png',
            _closed = !row.Status.toLowerCase().includes('open')

        if (subLookup) {
            fillColor = subLookup.fillColor
            strokeColor = subLookup.strokeColor
            icon = subLookup.icon
        } else if (lookup) {
            //const [group, category, subCategory, fillColor, strokeColor, icon] = lookup
            fillColor = lookup.fillColor
            strokeColor = lookup.strokeColor
            icon = lookup.icon
        }

        return {...row, fillColor, strokeColor, icon, _closed}
    })
}

function removeOverlap(rows) {
    //create coordinates array
    const coordRows = rows.map(row => {
        const digits = 4
        const lng = +(+row.Longitude).toFixed(digits);
        const lat = +(+row.Latitude).toFixed(digits);
        const temp = [lng, lat]
        const coordinates = [+row.Longitude, +row.Latitude]
        return {...row, coordinates, temp}
    })
    //find overlapped lnglat and move them slightly depending on order
    return coordRows.map(row => {
        const [lng1, lat1] = row.temp
        const overlapped = coordRows.filter(otherRow => {
            const [lng2, lat2] = otherRow.temp
            return lat1 === lat2 && lng1 === lng2
        })
        if (overlapped.length > 1) {
            //move depending on the index
            const index = overlapped.indexOf(row)
            row.coordinates = [lng1 + index * 0.00006, lat1 + index * 0.00003]
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