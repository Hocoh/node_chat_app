// create a connection 
// store sockets in a variable
// communicatin wit server 
const  socket = io();  

function scrollToBottom(){ 

    // Selectors
    let messages= jQuery('#messages'); 
    let newMessage = messages.children("li:last-child");


    // Height 
    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop"); 
    let scrollHeight= messages.prop("scrollHeight");
    let newMessageHeight= newMessage.innerHeight(); 
    let lastMessageHeight = newMessage.prev().innerHeight(); 


    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){ 
       messages.scrollTop(scrollHeight);
    }

}

socket.on("connect", function () { 
        let params = jQuery.deparam(window.location.search); 
        socket.emit("join", params, function(err) { 
              if(err){ 
                alert(err);
                window.location.href = "/";
              } else { 
                    console.log("Join successfully");
              }
        })

           // LISTEN
        // createMessage
        // parameters 
            // from, name,text
          // newMessage listener
        socket.on("welcome", function (message) { 
            let formattedTime = moment(message.createdAt).format("h:mm a");
            let template=  jQuery("#message-template").html();
            let html= Mustache.render(template, { 
                text : message.text,
                from: message.from,
                createdAt: formattedTime
            }); 

            jQuery('#messages').append(html);
            scrollToBottom();
        })  

        socket.on("userJoin", function (message) { 
            let formattedTime = moment(message.createdAt).format("h:mm a");
            let template=  jQuery("#message-template").html();
            let html= Mustache.render(template, { 
                text : message.text,
                from: message.from,
                createdAt: formattedTime
            }); 

            jQuery('#messages').append(html);
            scrollToBottom();
        })  
        
        socket.on("updateUserList", (userList) => { 
            let ol = jQuery("<ol></ol>");

            userList.forEach(function (user) { 
                ol.append(jQuery("<li></li>").text(user))
            });

            jQuery("#users").html(ol); 
        });

        socket.on("newLocationMessage", function(message) { 
            let formattedTime = moment(message.createdAt).format("h:mm a");
            let template=  jQuery("#location-message-template").html();
            let html= Mustache.render(template, { 
                url : message.url,
                from: message.from,
                createdAt: formattedTime
            }); 

            jQuery('#messages').append(html);
            scrollToBottom();

        })
            
    let messageTextbox = jQuery("[name=message]");

    jQuery("#message-form").on("submit", function (event) { 
        event.preventDefault();
        socket.emit("createMessage", { 
            from:"User",
            text: messageTextbox.val()
        }, function(){ 
            messageTextbox.val("")
        });
    });

    socket.on("newMessage", function (message) {
        let formattedTime = moment(message.createdAt).format("h:mm a");
        let template=  jQuery("#message-template").html();
        let html= Mustache.render(template, { 
            text : message.text,
            from: message.from,
            createdAt: formattedTime
        }); 

        jQuery('#messages').append(html);
        scrollToBottom();
    })  

    let locationButton = jQuery("#send-location") 
    locationButton.on("click", function() { 
        if(!navigator.geolocation){ 
            return alert("Geolocation failed on browser")
        }

        locationButton.attr("disabled", "disabled")
        .text("Sending location...");

        location

        var options = {
            enableHighAccuracy: true,
            // timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {

            locationButton.removeAttr("disabled")
            .text("Send location");

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
});


// call
socket.on("disconnect", function (){ 
    console.log("Disconnected to server");  
})




