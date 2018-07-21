let datestring = new Date().toLocaleString(); 

const generateMessage =  (from, text) => { 
    return { 
        from,
        text, 
        datestring
    }
}


module.exports =  {generateMessage};