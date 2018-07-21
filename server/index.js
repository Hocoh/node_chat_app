const path = require("path"); 
const express = require("express");
const publicPath= path.join(__dirname, "../public");
const app = express()
const port = process.env.PORT || 3000;
// create express configuration
    // static 
    // listen + console.log
    // start server _ appreciate html displaying
app.use(express.static("public"));
app.listen(port, () => { 
    console.log(`listen on ${port}`)
})
