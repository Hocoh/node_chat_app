// Jan 1st 1970 00:00:00 am
const moment = require("moment");

let someTimestamp= moment().valueOf();
console.log("moment tiamp", someTimestamp)
let createdAt= 1234;
let date= moment(createdAt);

date.add(1, "year").subtract(9,'months');
console.log("moment1", date.format( 
     "hh:mm a" 
))

console.log("moment2", date.format( 
    "h:m a" 
))
// console.log("traditional  way", new Date().toLocaleString())

// hh:mm am 
// h:mm am
