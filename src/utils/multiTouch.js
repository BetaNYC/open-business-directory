import { showPanOverlay } from '../stores'

//https://github.com/mapbox/mapbox-gl-js/issues/2618 and akhilb91
class MultiTouch {
    constructor() {
        this.state = {
            panStart: { x: 0, y: 0 },
            scale: 1,
            hypo: undefined,
        };
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.touchMove = this.touchMove.bind(this);
    }

    touchStart(event) {
        if (event.touches.length !== 2){
            this.showMessage()
            return;
        }

        event.stopImmediatePropagation();
        event.preventDefault();

        let x = 0;
        let y = 0;

        [].forEach.call(event.touches, (touch) => {
            x += touch.screenX;
            y += touch.screenY;
        });

        this.state.panStart.x = x / event.touches.length;
        this.state.panStart.y = y / event.touches.length;
    }

    showMessage() {
        //todo - debounce
        showPanOverlay.set(true)
        setTimeout(() => showPanOverlay.set(false), 1000);
    }

    touchEnd(event) {
        this.state.hypo = undefined;
    }

    getScale(event) {
        let hypo1 = Math.hypot(
            event.targetTouches[0].pageX - event.targetTouches[1].pageX,
            event.targetTouches[0].pageY - event.targetTouches[1].pageY
        );
        if (this.state.hypo === undefined) {
            this.state.hypo = hypo1;
        }
        return hypo1 / this.state.hypo;
    }
    touchMove(event) {
        if (event.touches.length !== 2) return;

        let scale = this.getScale(event);

        if (this.state.scale === scale) {
            event.stopImmediatePropagation();
            event.preventDefault();
        } else {
            this.state.scale = scale;
            return;
        }

        let x = 0;
        let y = 0;

        [].forEach.call(event.touches, (touch) => {
            x += touch.screenX;
            y += touch.screenY;
        });

        const movex = x / event.touches.length - this.state.panStart.x;
        const movey = y / event.touches.length - this.state.panStart.y;

        this.state.panStart.x = x / event.touches.length;
        this.state.panStart.y = y / event.touches.length;
        this.map.panBy([movex / -1, movey / -1], { animate: false });
    }

    onAdd(map) {
        this.map = map;
        this.container = document.createElement("div");
        this.map
            .getContainer()
            .addEventListener("touchstart", this.touchStart, false);
        this.map
            .getContainer()
            .addEventListener("touchmove", this.touchMove, false);
        this.map.getContainer().addEventListener("touchend", this.touchEnd, false);

        if ("ontouchstart" in document.documentElement) map.dragPan.disable();
        return this.container;
    }

    onRemove() {
        this.map.getContainer().removeEventListener("touchstart", this.touchStart);
        this.map.getContainer().removeEventListener("touchmove", this.touchMove);
        this.map = undefined;
    }
}

export default MultiTouch;
