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

//TODO require packages to be used: express,path,fs 
//TODO require db.json - ised to store and retrieve notes using fs module

//TODO define: port, express app

//TODO express middlware??
//TODO link assets

//* get routes
// app.get("/", function (req,res){})
// HTML ROUTES
//TODO GET /notes should return the notes.html file
//TODO GET * should return the index.html file

// API ROUTES
//TODO GET /api/notes should read the db.json file and return all saved notes as JSON

//TODO post routes
// app.post
//TODO POST /api/notes should receive a new note to save on the request body, add it 
//TODO    to the db.json file, and then return the new note to the client. You'll 
//TODO      need to find a way to give each note a unique id when it's saved 
//TODO            (look into npm packages that could do this for you)

// BONUS----------------------------------------------------------------------
// DELETE /api/notes/:id should receive a query parameter that contains the id 
//  of a note to delete. To delete a note, you'll need to read all notes from 
//      the db.json file, remove the note with the given id property, 
//          and then rewrite the notes to the db.json file
// ---------------------------------------------------------------------------

// app.listen Port