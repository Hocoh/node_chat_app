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
            let li = jQuery("<li></li>"); 
            li.text(`${message.from}: ${message.text}`);

            jQuery(`#messages`).append(li);
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
          
            socket.emit("createLocationMessage", { 
                latitude: crd.latitude,
                longitude: crd.longitude
            });
            // console.log('Votre position actuelle est :');
            // console.log(`Latitude : ${crd.latitude}`);
            // console.log(`Longitude: ${crd.longitude}`);
            // console.log(`Plus ou moins ${crd.accuracy} mètres.`);
          };
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          };
          
          navigator.geolocation.getCurrentPosition(success, error, options);
    });

    socket.on("newLocationMessage", function(message) { 

        let li = jQuery("<li></li>"); 
        let a = jQuery("<a target='_blank'>My current location </a>");


        li.text(`${message.from}:`);
        a.attr("href", message.url);
        li.append(a);
        jQuery("#messages").append(li); 
    })
});


// call
socket.on("disconnect", function (){ 
    console.log("Disconnected to server")
})




