// Jan 1st 1970 00:00:00 am
const moment = require("moment");

let momentTimestamp= moment().valueOf();

let datestring = new Date().toLocaleString(); 

const generateMessage =  (from, text) => { 
    return { 
        from,
        text, 
        momentTimestamp
    }
}

const generateLocationMessage = (from, latitude, longitude) => { 
 return { 
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    momentTimestamp
 }
}

module.exports =  {generateMessage, generateLocationMessage};