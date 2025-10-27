const hiddenText = document.querySelector(".hiddenText");
const noteList = document.querySelector(".noteList");
const textInput = document.querySelector(".newNoteText");
const newNoteButton = document.querySelector(".newNoteButton");

function saveNotes() {
  const notes = Array.from(noteList.children).map(li => li.firstChild.textContent);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const saved = JSON.parse(localStorage.getItem("notes")) || [];
  saved.forEach(text => addNoteToList(text));
  toggleEmptyMessage();
}

function toggleEmptyMessage() {
  hiddenText.style.display = noteList.children.length === 0 ? "block" : "none";
}

function addNoteToList(text) {
  const newNote = document.createElement("li");
  newNote.classList.add("Note");
  newNote.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";

  deleteBtn.addEventListener("click", () => {
    newNote.remove();
    saveNotes();
    toggleEmptyMessage();
  });

  newNote.appendChild(deleteBtn);
  noteList.appendChild(newNote);
}

newNoteButton.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text === "") return;
  addNoteToList(text);
  saveNotes();         
  toggleEmptyMessage();
  textInput.value = "";
});

loadNotes();
