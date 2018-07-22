let datestring = new Date().toLocaleString(); 

const generateMessage =  (from, text) => { 
    return { 
        from,
        text, 
        datestring
    }
}

const generateLocationMessage = (from, latitude, longitude) => { 
 return { 
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    datestring
 }
}

module.exports =  {generateMessage, generateLocationMessage};