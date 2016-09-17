"use strict";

export default class Utils{
    /**
     * Get object dump
     * @param objObject
     * @returns {string}
     */
    getObjectToDump(objObject:Object):string {
        let strDump = "";
        for (let i in objObject) {
            strDump += "\t" + i + ":" + objObject[i] + "\r\n";
        }
        return strDump;
    }

    /**
     * Get class interface
     * @param objObject
     * @returns {{}}
     */
    getInterface(objObject:Object) {
        let objInterface = {};
        for (let i in objObject) {
            objInterface[i] = typeof(objObject[i]);
        }
        return objInterface;
    }

    /**
     * Check is instance of
     * @param objFirstObject
     * @param objSecondObject
     * @returns {boolean}
     */
    isInstanceOf(objFirstObject:Object,
        objSecondObject:Object):boolean {
        if (
            !(
                typeof objFirstObject == "object" &&
                objFirstObject &&
                typeof objSecondObject == "object" &&
                objSecondObject
            )
        ) {
            return false;
        }
        for (let i in objFirstObject) {
            if (!objSecondObject.hasOwnProperty(i)) {
                return false;
            }
        }
        for (let i in objSecondObject) {
            if (!objFirstObject.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if variable is empty
     * @param variable
     * @returns {boolean}
     */
    isEmpty(variable:any) {
        if (
            Array.isArray(variable)
        ) {
            return variable.length == 0;
        } else if (
            typeof variable == "object"
        ) {
            return Object.keys(variable).length == 0;
        } else if (
            typeof variable == "string"
        ) {
            return false;
        } else {
            return typeof variable == "undefined";
        }
    }

    /**
     * Assign empty parameters with default
     * @param objFirstObject
     * @param objSecondObject
     * @param claObjectClass
     * @returns {Object}
     */
    assignEmpty(objFirstObject:Object,
        objSecondObject:Object,
        claObjectClass:any):any {
        objFirstObject = objFirstObject || {};

        let objInterface = this.getInterface(new claObjectClass());
        for (let key in objInterface) {
            if (
                this.isEmpty(objFirstObject[key]) && !this.isEmpty(objSecondObject[key]) &&
                typeof objSecondObject[key] == objInterface[key]
            ) {
                objFirstObject[key] = objSecondObject[key];
            }
        }
        return objFirstObject;
    }
}