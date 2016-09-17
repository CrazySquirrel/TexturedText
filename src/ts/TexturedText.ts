"use strict";
/**
 * Import additional classes
 */
import Utils from "./Utils.ts";
import AnimationFrame from "./AnimationFrame.ts";
/**
 * Params interface
 */
interface ParamsInterface {
    textureSrc:string;
    offsetX:number;
    offsetY:number;
}
/**
 * Params class
 */
class ParamsClass implements ParamsInterface {
    textureSrc:string;
    offsetX:number;
    offsetY:number;

    constructor() {
        this.textureSrc = "";
        this.offsetX = 0;
        this.offsetY = 0;
    }
}
/**
 * TexturedText class
 */
export default class TexturedText {
    /**
     * TexturedText properties
     */
    domTextElement:HTMLElement;
    objParams:ParamsClass;
    Utils:Utils;
    domImage:any;

    /**
     * TexturedText constructor
     * @param domTextElement
     * @param objParams
     */
    constructor(domTextElement?:HTMLElement,
                objParams?:ParamsClass) {
        this.Utils = new Utils();
        /**
         * Save params
         * @type {HTMLElement}
         */
        this.domTextElement = domTextElement;
        this.objParams = objParams;
        this.domImage = false;
        /**
         * Assign default params
         */
        objParams = this.assignDefaultParams(this.objParams);
        /**
         * Parameter validation errors
         */
        if (!this.checkInnerParamsForErrors(this.domTextElement, this.objParams)) {
            this.watch();
            AnimationFrame.subscribe(this,function(){this.watch();},[]);
        }
    }

    /**
     * Watcher for element
     */
    watch() {
        this.updateTexture();
    }

    /**
     * Update text texture
     */
    updateTexture() {
        if(!this.domImage){
            let _domImage = new Image();
            _domImage.onload = () => {
                this.domImage = _domImage;
            };
            _domImage.src = this.objParams.textureSrc;
        }else{
            let domCanvas = document.createElement("canvas");
            let conCanvas = domCanvas.getContext("2d");
            conCanvas.fillRect(0, 0, this.domImage.width, this.domImage.height);
            conCanvas.drawImage(this.domImage, -this.objParams.offsetX, -this.objParams.offsetY);
            conCanvas.drawImage(this.domImage, this.domImage.width - this.objParams.offsetX, -this.objParams.offsetY);
            conCanvas.drawImage(this.domImage, -this.objParams.offsetX, this.domImage.height - this.objParams.offsetY);
            conCanvas.drawImage(this.domImage, this.domImage.width - this.objParams.offsetX, this.domImage.height - this.objParams.offsetY);
            let conPattern = conCanvas.createPattern(domCanvas, 'repeat');
            domCanvas.width = this.domTextElement.clientWidth;
            domCanvas.height = this.domTextElement.clientHeight;
            conCanvas.clearRect(0, 0, domCanvas.width, domCanvas.height);
            let objStyles = getComputedStyle(this.domTextElement);
            conCanvas.fillStyle = conPattern;
            conCanvas.font = objStyles.font;
            conCanvas.textAlign = objStyles.textAlign;
            conCanvas.textBaseline = "bottom";
            conCanvas.fillText(this.domTextElement.innerText, 0, domCanvas.height);
            this.domTextElement.style.backgroundPosition = 'left top';
            this.domTextElement.style.backgroundRepeat = 'no-repeat';
            this.domTextElement.style.backgroundImage = 'url(' + domCanvas.toDataURL() + ')';
            this.domTextElement.style.color = 'rgba(0,0,0,0)';
        }

    }

    /**
     * Assign default grid params
     * @param objGridParams
     * @returns {Object}
     */
    assignDefaultParams(objParams:ParamsClass):ParamsClass {
        /**
         * Field empty grid parameters from default settings
         */
        objParams = this.Utils.assignEmpty(objParams, new ParamsClass(), ParamsClass);
        return objParams;
    }

    /**
     * Check input parameters for correctness
     * @param domTextElement
     * @param objParams
     * @returns {boolean}
     */
    checkInnerParamsForErrors(domTextElement?:HTMLElement,
                              objParams?:ParamsClass) {
        let isError = false;
        if (
            !isError && !(
                typeof domTextElement == "object" &&
                domTextElement instanceof HTMLElement &&
                typeof domTextElement.parentNode == "object" &&
                domTextElement.parentNode instanceof HTMLElement
            )
        ) {
            console.warn("The first parameter should be a DOM element.");
            isError = true;
        }
        if (
            !isError && !(
                typeof domTextElement.parentNode == "object" &&
                domTextElement.parentNode instanceof HTMLElement
            )
        ) {
            console.warn("The first parameter must be an existing DOM element.");
            isError = true;
        }
        if (
            !isError && !(
                typeof objParams == "object"
            )
        ) {
            console.warn("The second parameter must be an object.");
            isError = true;
        }
        if (
            !isError && !(
                this.Utils.isInstanceOf(objParams, new ParamsClass())
            )
        ) {
            console.warn("The object with the parameters needs to implement the interface:" + "\r\n" + this.Utils.getObjectToDump(this.Utils.getInterface(new ParamsClass())));
            isError = true;
        }
        return isError;
    }
}
/**
 * Export TexturedText to global
 */
window["TexturedText"] = TexturedText;