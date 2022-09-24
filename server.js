// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

//require packages to be used: express, path, fs 
const express = require("express");
const path = require("path");
const fs = require("fs");
//require db.json - used to store and retrieve notes using fs module
const db = require("./db/db.json");
const {v4 : uuidv4} = require('uuid')

// require routes to post notes
const routes = require('./routes');

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
    // res.json(db);
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if(err){
            res.json(err);
        }else{
            const savedNotes = JSON.parse(data);
            // const list = req.params.savedNotes;
            res.json(savedNotes)
        }
    })
} );

// Create new note
app.post("/api/notes", async (req, res) => {
    
    // read db.json, respond with error or data if successful
    fs.readFile("./db/db.json", (err, data) => {
        if(err){
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
                if(err){
                    res.json(err)
                }else{
                    console.log("Message created.");
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
    // get query param (id) for desired note

    // read all notes from db.json; remove note with matching id

    // rewrite notes to db.json

})

// app.listen Port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);