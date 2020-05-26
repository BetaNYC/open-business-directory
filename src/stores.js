import { writable } from "svelte/store";

function createSelectedItem() {
    const { subscribe, set, update } = writable(null);

    return {
        subscribe,
        select: (row, map, center) => {
            //go to latlng
            if(center){
                const zoom = 18
                map.flyTo({center, zoom})
            }
            set(row)
        },
        reset: () => set(null)
    };
}


export const rows = writable([])
export const filters = writable([])
export const selectedItem = createSelectedItem()

export const mapObject = writable(null)
export const showPanOverlay = writable(false)
