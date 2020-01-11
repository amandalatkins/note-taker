const moment = require("moment");

module.exports = app => {

    // Read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    // Receives a new note, adds it to db.json, then returns the new note
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        notes[uniqueId++] = newNote;

        updateDb();

        return console.log("Added new note: "+newNote.title);

    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    }

    // Deletes a note with specific id
    app.delete("/api/notes/:id", function(req, res) {
        delete notes[req.params.id];
        updateDb();
        console.log("Deleted note with id "+req.params.id);
    });

    function updateDb() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) return console.log(err);
            return true;
        });
    }

}