// create a connection 
// store sockets in a variable
// communicatin wit server 
const  socket = io();
 



socket.on("connect", function () { 
        console.log("connected to server");

           // LISTEN
        // createMessage
        // parameters 
            // from, name,text
          // newMessage listener
        socket.on("newMessage", function (message) { 
            console.log("message from local server", message)
        })  
            
              
});


// call
socket.on("disconnect", function (){ 
    console.log("Disconnected to server")
})





