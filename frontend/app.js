document.getElementById('saveNoteBtn').addEventListener('click', () => {
    const content = document.getElementById('noteInput').value;

    if (content.trim() === "") {
        alert("Note content cannot be empty.");
        return;
    }

    fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(data => {
        alert('Note saved!');
        document.getElementById('noteInput').value = '';
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('listNotesBtn').addEventListener('click', () => {
    fetch('http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => {
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';
        data.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note-item');
            noteDiv.innerHTML = `
                <span>${note.content}</span>
                <button class="delete-btn" data-id="${note.id}">Delete</button>
            `;
            notesList.appendChild(noteDiv);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                fetch(`http://localhost:3000/notes/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.text())
                .then(message => {
                    alert(message);
                    e.target.parentElement.remove();
                })
                .catch(error => console.error('Error:', error));
            });
        });
    })
    .catch(error => console.error('Error:', error));
});
