const notesContainer = document.querySelector('.app')
const addBtn = document.querySelector('.add-notes')

getNotes().forEach(note => {{
    const noteElement = createElement(note.id, note.content)
    notesContainer.insertBefore(noteElement, addBtn)
}})


function getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]")
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function createElement(id, content) {
    const element = document.createElement("textarea")
    element.classList.add("notes")
    element.value = content
    element.placeholder = "What's on your mind..."


    element.addEventListener('change', ()=> {
        updateNote(id, element.value)
    })

    element.addEventListener('dblclick', ()=> {
        const doDelete = confirm("Are you sure you want to delete?")

        if (doDelete) {
            deleteNote(id, element)
        }
    })


    return element
}

function addNote() {    
    Notes = getNotes()
    const noteObject = {
        id: Math.floor(Math.random() * 1000),
        content: ""
    }

    const noteElement = createElement(noteObject.id, noteObject.content)
    notesContainer.insertBefore(noteElement, addBtn)

    Notes.push(noteObject)
    saveNotes(Notes)

}

function updateNote(id, newContent) {
    const notes = getNotes()
    const targetNote = notes.filter(note => note.id ==id)[0]


    targetNote.content = newContent
    saveNotes(notes)

}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id)

    saveNotes(notes)
    notesContainer.removeChild(element)

}

addBtn.addEventListener('click', ()=> addNote())

