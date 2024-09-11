const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Replace with your MySQL username
    password: 'jatin@123', // Replace with your MySQL password
    database: 'notes_db'    // Make sure the database exists
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

const createNoteTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL
    )`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Notes table created or already exists");
    });
};

const saveNote = (content, callback) => {
    const sql = 'INSERT INTO notes (content) VALUES (?)';
    db.query(sql, [content], callback);
};

const getAllNotes = (callback) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, callback);
};

const deleteNote = (id, callback) => {
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = { createNoteTable, saveNote, getAllNotes, deleteNote };
