//require packages to be used: express, path, fs, uuid
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const db = require("./db/db.json");

//define: port, express app
const app = express();
const PORT = process.env.PORT || 3000;

//express middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//link assets
app.use(express.static('public'));

//GET /notes should return the notes.html file
app.get("/notes", async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//GET * should return the index.html file
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// API ROUTES ------------------------------------------------------------------------------
//GET /api/notes should read the db.json file and return all saved notes as JSON
app.get("/api/notes", async (req, res) => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            res.json(err);
        } else {
            const savedNotes = JSON.parse(data);
            res.json(savedNotes)
        }
    })
});

// POST create new note
app.post("/api/notes", async (req, res) => {

    // read db.json, respond with error or data if successful
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            res.json(err);
        } else {
            // parse data from db, add new note to savedNotes
            const savedNotes = JSON.parse(data);
            const uniqueId = uuidv4();
            let newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uniqueId,
            };
            savedNotes.push(newNote);

            // Write updated notes to db.json
            fs.writeFile("./db/db.json", JSON.stringify(savedNotes, null, "\t"), (err) => {
                if (err) {
                    res.json(err)
                } else {
                    console.log("Note created.");
                }
            })
            res.json(newNote);
        }

    });

})

// BONUS----------------------------------------------------------------------
// DELETE /api/notes/:id should receive a query parameter that contains the id 
//  of a note to delete. To delete a note, you'll need to read all notes from 
//      the db.json file, remove the note with the given id property, 
//          and then rewrite the notes to the db.json file
// ---------------------------------------------------------------------------

app.delete("/api/notes/:id", async (req, res) => {

    // read all notes from db.json; remove note with matching id
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            res.json(err)
        } else {
            console.log("deleting note...");
        }
        // remove note from db through splice at index to target id
        let savedNotes = JSON.parse(data);
        for (let i = 0; i < savedNotes.length; i++) {
            if (req.params.id == savedNotes[i].id) {
                savedNotes.splice(i, 1);
                break;
            }
        }
        // rewrite notes to db.json
        fs.writeFile("./db/db.json", JSON.stringify(savedNotes, null, "\t"), (err) => {
            if (err) {
                res.json(err)
            } else {
                console.log("Note deleted.");
            }

            res.json(savedNotes);
        })
    })

});


// app.listen Port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);