showNotes();
//Add Note Code
document.getElementById("addNoteBtn").addEventListener("click", function (e) {
  e.preventDefault();
  let getNoteTitle = document.getElementById("addNoteTitle");
  let getNoteText = document.getElementById("addNoteText");
  if (getNoteText.value != "" && getNoteTitle.value != "") {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push({ title: getNoteTitle.value, text: getNoteText.value });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    getNoteText.value = "";
    getNoteTitle.value = "";
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
      let { title, text } = element;
      html += `<div class='NotesDiv'><p>${title}</p><p>${text}</p><button id="${index}" onclick='editNote(this.id)'>Edit</button><button id="${index}" onclick='deleteNote(this.id)'>Delete</button></div>`;
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

// Edit Note Div
let editDiv = document.createElement("div");
editDiv.innerHTML = `<div class="updateSectionDiv">
<form>
<div class="update-title">
  <p>Update Note</p><div class="crossBtn"></div></div>
  <input type="text" id="editNoteTitle" />
  <textarea id="editNoteText"></textarea>
  <button id="updateNoteBtn">Update</button>
</form>
</div>`;
document.getElementsByTagName("body")[0].appendChild(editDiv);

// Edit Function
function editNote(index) {
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  let { title, text } = notesObj[index];
  let editTitleField = document.querySelector("#editNoteTitle");
  editTitleField.value = title;
  let editTextField = document.querySelector("#editNoteText");
  editTextField.value = text;
  let visibleDiv = document.querySelector(".updateSectionDiv");
  visibleDiv.classList.add("visibleDiv");

  //   Update Button Code
  document.querySelector("#updateNoteBtn").addEventListener("click", (e) => {
    e.preventDefault();
    if (editTitleField.value == "" || editTitleField.value == "") {
      alert("Input Data or Use Crossmark");
    } else {
      title = editTitleField.value;
      text = editTextField.value;
      notesObj[index].title = title;
      notesObj[index].text = text;
      localStorage.setItem("notes", JSON.stringify(notesObj));
      visibleDiv.classList.remove("visibleDiv");
      showNotes();
    }
  });
  // End Update Button

  // Cross Btn Code
  document.querySelector(".crossBtn").addEventListener("click", (e) => {
    let disableDiv = e.target.parentNode.parentNode.parentNode;
    disableDiv.classList.remove("visibleDiv");
  });
  // End Cross Btn Code
}

// search notes
document.getElementById("searchTxt").addEventListener("input", function (e) {
  let searchTxt = e.target.value.toLowerCase();
  let notesDiv = document.getElementsByClassName("NotesDiv");
  Array.from(notesDiv).forEach((element) => {
    let getDivTitle = element
      .getElementsByTagName("p")[0]
      .innerText.toLowerCase();
    let getDivText = element
      .getElementsByTagName("p")[1]
      .innerText.toLowerCase();
    if (getDivTitle.includes(searchTxt) || getDivText.includes(searchTxt)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
