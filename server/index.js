// tools
const path = require("path");
const http = require("http");  
const express = require("express");


// settings
const publicPath= path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;

// units 
const {generateMessage, generateLocationMessage} =require("./unit/message"); 
// adding entry for incomine socket. connection 
// server accept connection
// client make connection
// enhance persisting connection
// send data from °client _ server°
// > use manuall http 
// > configure express to use http server
// > connect bunch to socket.io support 

// ### const io= require("socket.io")(http); ##
const server = http.createServer(app);
// connect server to sockets
// define a websocket's server
// open a pipeline to listening _ emitting events 
// allow to communicate wit client _ receive connections 
const socketIO = require("socket.io");
const io = socketIO(server);

// date format 
var datestring = new Date().toLocaleString(); 

// build in listeners 
// listen for event 
io.on('connection', (socket) => {
    // emmit to all users above the emmiter
    socket.broadcast.emit("userJoin",
    generateMessage("admin", "new user join")
)



    // event returned exclusively to emmiter 
    socket.emit('welcome',
    generateMessage("admin", "welcome in chatroom =)")

    // { 
    //     from : "admin",
    //     text: "welcome in chatroom =)",
    //     date: datestring
    // }
)


    // pipeline between ° client _ server ° 
    socket.on("createMessage",  function (message, callback) { 
        console.log("client email", message)


        // add a date to message 
        message.createdAt = datestring
        io.emit("newMessage",message)

        callback("Awesome")

        // broadcast allow to exclude emitter
        // from receive the emit message
        // socket.broadcast.emit("newMessage", message)
    })

    socket.on("createLocationMessage", (coords)=> { 
        io.emit(
            "newLocationMessage",
            generateLocationMessage("Admin", coords.latitude, coords.longitude))
    });

    // LISTEN EVENT

    socket.on('disconnect', (socket) => {
        // each socket represent individuals sockets 
        // of users 
        console.log('a user disconnected');
    });

    
        

    
});
  

// new email

 


// create express configuration
    // static 
    // listen + console.log
    // start server _ appreciate html displaying
app.use(express.static(publicPath));
server.listen(port, () => { 
    console.log(`listen on ${port}`)
})
