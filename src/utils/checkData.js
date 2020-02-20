const moment = require('moment')
const validator = require('validator');
function isNumber(data) {
    try {
        parseInt( data, 10 );  
        return true
    } catch {
        return false
    }
}

function isTextOnly(data) {
    dataCMP = data.replace(/[0123456789!@#$%^&*(){};'.,+|-]/g, "");
    return data === dataCMP
}

function isText(data,exception) {
    if(!!exception) data = data.replace(exception, "");
    dataCMP = data.replace(/[!@#$%^&*(){};'.,+|-]/g, "");
    return data === dataCMP
}

function isDate(data) {
    let leng = data.length;
    if(leng <= 10)
        return moment(data, "DD-MM-YYYY", true).isValid()
    else
        return moment(data, "DD-MM-YYYY HH:mm:ss", true).isValid()
}

function isEmpty(data) {
    if (data === "" || data === null || data === undefined)
        return true;
    if (Array.isArray(data)) {
        if (data.length === 0)
            return true;
    }
    if ((typeof data) === "object") {
        for (let key in data) {
            if (data.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    return false;
}

function check(type,data,allowEmpty) {
    if(data===undefined){
        if(allowEmpty===0 || allowEmpty===false) return false; 
        if( allowEmpty===undefined || allowEmpty===1 || allowEmpty===true) return true; 
    }
    if( isEmpty(type)) return null;
    if(typeof(type)==="object"){
        return type.includes(data);
    } else{
        switch (type) {
            case "isInt":
                return( validator.isInt(data));
            case "isNumber":
                return( isNumber(data));
            case "isTextOnly":
                return( isTextOnly(data));
            case "isText":
                return( isText(data));
            case "isDate":
                return( isDate(data));
            case "isEmpty":
                return( isEmpty(data));
            default:
                return null
        }
    }
}

function checkData(field,type,data,allowEmty) {
    try {
        if(typeof(data) === "object"){
            for (let index = 0; index < field.length; index++) {
                const fd = field[index];
                let checkFd = check(type[index],data[fd],allowEmty)
                if( checkFd === false) return {value:false,error_message: "Lỗi định dang trường "+fd};
                else if( checkFd === null) return {value:null};
            }
            return {value:true};
        } else{

        }
    } catch (error) {
        console.log(error);
        return {value:null};
    }
}

function filterFieldNextnull(field,data) {
    let result = {};
    for (let index = 0; index < field.length; index++) {
        const fd = field[index];
        if( !isEmpty(data[fd]) ) {
            result[fd] = data[fd]
        }
    }
    return result;
}

function filterFieldArrNextnull(field,data) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        result[i] = {};
        for (let index = 0; index < field.length; index++) {
            const fd = field[index];
            if( !isEmpty(data[fd]) ) {
                result[i][fd] = data[fd]
            }
        }
    }
    return result;
}
module.exports={
    isNumber : isNumber,
    isTextOnly : isTextOnly,
    isText : isText,
    isDate: isDate,
    isEmpty: isEmpty,
    check: check,
    checkData: checkData,
    filterFieldNextnull: filterFieldNextnull,
    filterFieldArrNextnull: filterFieldArrNextnull,
}
