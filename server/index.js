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
const {isRealString} = require("./unit/validation");
const {Users} = require("./unit/users")


// ### const io= require("socket.io")(http); ##
const server = http.createServer(app);
// connect server to sockets
// define a websocket's server
// open a pipeline to listening _ emitting events 
// allow to communicate wit client _ receive connections 
const socketIO = require("socket.io");
const io = socketIO(server);
let users = new Users(); 

// date format 
const datestring = new Date().toLocaleString(); 

// build in listeners 
// listen for event 
io.on('connection', (socket) => {

    // { 
    //     from : "admin",
    //     text: "welcome in chatroom =)",
    //     date: datestring
    // }


    socket.on("join", (params, callback) => { 
        if (!isRealString(params.name) || !isRealString(params.room)){ 
          return  callback(" °Name _ room° name required") 
        }

        socket.join(params.room);
        users.removeUser(socket.id)     
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room)); 
        // event returned exclusively to emmiter 
        socket.emit('welcome',
                    generateMessage("admin", "welcome in chatroom =)"));
       
        // socket.leave
        // emmit to all users above the emmiter
        socket.broadcast.to(params.room).emit("userJoin",
        generateMessage("admin", ` ${params.name} join`));
        
        
 
        callback();
    });


    // pipeline between ° client _ server ° 
    socket.on("createMessage",  function (message, callback) { 
        // add a date to message 
        message.createdAt = datestring
        io.emit("newMessage",message)

        callback();

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

    socket.on('disconnect', () => {
        // each socket represent individuals sockets 
        // of users 
        let user = users.removeUser(socket.id); 
        console.log(`${user.name} has disconnected`)
        if(user){ 

            // update user list
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));

            // inform user's room someone leave
            io.to(user.room).emit("newMessage", generateMessage("Admin",
            `${user.name} has left`));
        }
    });    
});

 


// create express configuration
    // static 
    // listen + console.log
    // start server _ appreciate html displaying
app.use(express.static(publicPath));
server.listen(port, () => { 
    console.log(`listen on ${port}`)
})
