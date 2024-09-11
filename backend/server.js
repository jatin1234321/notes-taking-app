const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createNoteTable, saveNote, getAllNotes, deleteNote } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

createNoteTable();

// Save a note
app.post('/notes', (req, res) => {
    const content = req.body.content;
    if (!content) return res.status(400).send('Note content is required');
    
    saveNote(content, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId, content });
    });
});

// List all notes
app.get('/notes', (req, res) => {
    getAllNotes((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    deleteNote(id, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('Note not found');
        res.status(200).send(`Note with id ${id} deleted`);
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
