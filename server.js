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
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

//GET * should return the index.html file
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API ROUTES ------------------------------
//GET /api/notes should read the db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => res.json(db));

//TODO post routes
// app.post
//TODO POST /api/notes should receive a new note to save on the request body, add it 
//TODO    to the db.json file, and then return the new note to the client. You'll 
//TODO      need to find a way to give each note a unique id when it's saved 
//TODO            (look into npm packages that could do this for you)

app.post("/api/notes", (req, res) => {

    fs.readFile(db, "utf8", (err, data) => {
        if(err){
            res.json(err);
        } else {
            // 
            const newNote = req.body; 
            const savedNotes = JSON.parse(data);
            savedNotes.push(newNote);

            fs.writeFile(db, JSON.stringify(savedNotes, null, "\t"))
        }
    })


    
})

// app.use(routes);
// app.route("/api/notes")
//     // get new note to save on body
//     res.json({requestBody: req.body})

//     // add to db.json
//     .post(function (req, res) {

//     })

// return new note



// BONUS----------------------------------------------------------------------
// DELETE /api/notes/:id should receive a query parameter that contains the id 
//  of a note to delete. To delete a note, you'll need to read all notes from 
//      the db.json file, remove the note with the given id property, 
//          and then rewrite the notes to the db.json file
// ---------------------------------------------------------------------------

app.delete("/api/notes/:id", (req, res) => {
    // get query param (id) for desired note

    // read all notes from db.json; remove note with matching id

    // rewrite notes to db.json

})

// app.listen Port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);