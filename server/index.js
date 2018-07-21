// tools
const path = require("path");
const http = require("http");  
const express = require("express");


// settings
const publicPath= path.join(__dirname, "../public");
const app = express();
const port = process.env.PORT || 3000;


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

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
//   });

// build in listeners 
// listen for event 
io.on('connection', (socket) => {
    // each socket represent individuals sockets 
    // of users 
    console.log('new user connected');

    socket.on('disconnect', (socket) => {
        // each socket represent individuals sockets 
        // of users 
        console.log('a user disconnected');
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
