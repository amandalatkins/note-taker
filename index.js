// Require Dependencies
const express = require("express");
const fs = require("fs");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup global notes variable
fs.readFile("./db/db.json","json",function(data) {
    var notes = data;
});
var uniqueId = 0;

//Require routes file
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  