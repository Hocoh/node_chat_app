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
        socket.on("welcome", function (message) { 
            console.log("message from local server", message)
        })  

        socket.on("userJoin", function (message) { 
            console.log("message from local server", message)
        })  

        socket.on("newMessage", function (message) { 
            console.log("message from local server", message)
            let li = jQuery("<li></li>"); 
            li.text(`${message.from}: ${message.text}`);

            jQuery(`#messages`).append(li);
        })  
            
        // socket.emit("createMessage",{ 
        //     from : "client",
        //     text: "Hi"
        //     }, 
        //     function (data) { 
        //     console.log("got it")
        //     console.log("from server: ", data)
        // });

});


// call
socket.on("disconnect", function (){ 
    console.log("Disconnected to server")
})


jQuery("#message-form").on("submit", function (event) { 
    event.preventDefault();
    socket.emit("createMessage", { 
        from:"User",
        text: jQuery("[name=message]").val()
    }, function(){ 

    });
});


