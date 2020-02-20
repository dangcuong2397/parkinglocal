

const moment = require('moment');



/**
 *
 * @param string
 * @param isNumber
 * @returns {number[]} = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
 */
function old_stringToArray(string, isNumber=false) {
    string = string.replace(/[.*+?^$()|[\]\\]/g, '');
    return isNumber ? string.split(",").map(Number) : string.split(",");
}

function old_arrayToString(array, isStringify=false) {
    return JSON.stringify(array);
}

function stringObjToArray(string) {
    if(!string)
        return null;
    if(Array.isArray(string))
        return string;
    string = JSON.parse(string);
    return string.array;
}

function arrayToStringObj(array) {
    if(!array)
        return null;
    return JSON.stringify({array: array});
}

// let arr1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
// let arr2 = [
//     {"number":[12,23,34,45,35],"price":400},
//     {"number":[12,23,34,45,35],"price":400},
//     {"number":[12,23,34,45,35],"price":400}
//
// ];
// console.log( arrayToStringObj(arr2) );
// console.log( stringObjToArray( arrayToStringObj(arr2) ) );

let convertInputDate = (date, isToday=false, isNow=false) => {
    try {
        if(isToday)
            return moment().format("YYYY-MM-DD");
        if(isNow)
            return moment().format("YYYY-MM-DD HH:mm:ss");
        if(!date)
            return null;

        if( moment(date, "DD-MM-YYYY HH:mm:ss", true).isValid() )
            return moment(date, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        if( moment(date, "DD-MM-YYYY", true).isValid() )
            return moment(date, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss");
        return null;
    } catch (e) {
        console.log(`ERROR: convertInputDate || ${e}`);
        return e.message
    }
};

let convertOutputDate = (date, isToday=false) => {
    try {
        if(isToday)
            return moment().format("DD-MM-YYYY");
        if(!date)
            return null;

        if( moment(date, "YYYY-MM-DD HH:mm:ss", true).isValid() )
            return moment(date, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
        if( moment(date, "YYYY-MM-DD", true).isValid() )
            return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY HH:mm:ss");
        return null;
    } catch (e) {
        console.log(`ERROR: convertOutDate || ${e}`);
        return e.message
    }
};

function convertTermToString(number, isKeno=false){
    let pad = isKeno === true ? 6 : 5;
    return '#' + number.toString().padStart(pad, '0');
}

function convertTermToNumber(string, isKeno=false){
    try {
        if (!string)
            return null;
        if (string[0]!=='#')
            return string;
        string = string.slice(1);
        return parseInt(string);
    } catch (err) {
        log.error(err);
        return null;
    }
}


module.exports = {
    stringObjToArray,
    arrayToStringObj,
    convertInputDate,
    convertOutputDate,
    convertTermToString,
    convertTermToNumber,
}