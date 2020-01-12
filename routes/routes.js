const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports = app => {

    var readFileAsync = util.promisify(fs.readFile);

    // Setup notes variable
    readFileAsync("db/db.json","utf8").then(function(data) {
        // console.log("Reading db file");
        var notes = JSON.parse(data);
    
        // Read the db.json file and return all saved notes as JSON.
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        // Receives a new note, adds it to db.json, then returns the new note
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);

            updateDb();

            return console.log("Added new note: "+newNote.title);

        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
    
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) return console.log(err);
                return true;
            });
        }

    });

}