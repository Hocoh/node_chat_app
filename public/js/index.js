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
            let li = jQuery("<li></li>"); 
            li.text(`${message.from}: ${message.text}`);

            jQuery(`#messages`).append(li);
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


    jQuery("#message-form").on("submit", function (event) { 
        event.preventDefault();
        socket.emit("createMessage", { 
            from:"User",
            text: jQuery("[name=message]").val()
        }, function(){ 

        });
    });

    let locationButton = jQuery("#send-location") 
    locationButton.on("click", function() { 
        if(!navigator.geolocation){ 
            return alert("Geolocation failed on browser")
        }

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            var crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
    });
});


// call
socket.on("disconnect", function (){ 
    console.log("Disconnected to server")
})




