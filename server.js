// Require Dependencies
const express = require("express");
const fs = require("fs");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Require routes file
require('./routes/routes')(app);
// require('./routes/htmlRoutes')(app);

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  