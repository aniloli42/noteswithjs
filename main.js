showNotes();
//Add Note Code
document.getElementById("addNoteBtn").addEventListener("click", function (e) {
  e.preventDefault();
  let getNote = document.getElementById("addNoteText");
  if (getNote.value != "") {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(getNote.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    getNote.value = "";
    showNotes();
  } else {
    alert("input Data");
  }
});

// Show Notes
function showNotes() {
  let showNoteField = document.querySelector(".showNoteField");
  let html = "";
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    html = `<p>Nothing to show! Use 'Add a Note' section to add notes.</p>`;
    showNoteField.innerHTML = html;
  } else {
    notesObj = JSON.parse(localStorage.getItem("notes"));
    notesObj.forEach(function (element, index) {
      html += `<div class='NotesDiv'><p>Note ${
        index + 1
      }</p><p>${element}</p><button id="${index}" onclick='deleteNote(this.id)'>Delete Note</button></div>`;
    });
    showNoteField.innerHTML = html;
  }
}

// Delete Note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  notesObj.splice(index, 1);
  if (notesObj.length == 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  showNotes();
}

// search notes
document.getElementById("searchTxt").addEventListener("input", function (e) {
  let searchTxt = e.target.value.toLowerCase();
  let notesDiv = document.getElementsByClassName("NotesDiv");
  Array.from(notesDiv).forEach(function (element) {
    let getDiv = element.getElementsByTagName("p")[1].innerText.toLowerCase();
    if (getDiv.includes(searchTxt)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
