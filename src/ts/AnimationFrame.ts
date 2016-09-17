"use strict";
/**
 * requestAnimationFrame
 */
window["requestAnimationFrame"] = (function () {
    return (
            window &&
            (
                window["requestAnimationFrame"] ||
                window["webkitRequestAnimationFrame"] ||
                window["mozRequestAnimationFrame"] ||
                window["oRequestAnimationFrame"] ||
                window["msRequestAnimationFrame"]
            )
        ) ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
/**
 * Request animation frame call stack class
 */
class AnimationFrame {
    /**
     * Callbalck list
     */
    stack:any;

    /**
     * Create request animation frame
     */
    constructor() {
        this.stack = {};
        this.watch();
    }

    /**
     * Subscribe method
     * @param context
     * @param callback
     * @param params
     * @return {any}
     */
    subscribe(context,
              callback = () => {
              },
              params = []):any {
        if (
            context &&
            callback &&
            typeof context == "object" &&
            typeof callback == "function"
        ) {
            let ID = "x-" + (new Date).getTime() + "-" + Math.round(Math.random() * 1e6);
            this.stack[ID] = {
                context,
                callback,
                params
            };
            console.info("AnimationFrame stack " + Object.keys(this.stack).length);
            return ID;
        }
        return false;
    }

    /**
     * Unsubscribe method
     * @param ID
     */
    unsubscribe(ID) {
        if (this.stack[ID]) {
            this.stack[ID] = false;
            delete this.stack[ID];
            console.info("AnimationFrame stack " + Object.keys(this.stack).length);
        }
    }

    /**
     * Watch and call methods
     */
    watch() {
        if (
            this.stack &&
            typeof this.stack == "object" &&
            Object.keys(this.stack).length > 0
        ) {
            for (let ID in this.stack) {
                if (ID) {
                    let objCall = this.stack[ID];
                    if (
                        objCall &&
                        objCall.context &&
                        objCall.callback &&
                        objCall.params &&
                        typeof objCall.context == "object" &&
                        typeof objCall.callback == "function" &&
                        Array.isArray(objCall.params)
                    ) {
                        objCall.callback.apply(objCall.context, objCall.params);
                    }
                }
            }
        }
        window["requestAnimationFrame"](this.watch.bind(this));
    }
}
/**
 * Create single request animation frame object
 * @type {any|AnimationFrame}
 */
window["AnimationFrame"] = window["AnimationFrame"] || new AnimationFrame();

export default window["AnimationFrame"];