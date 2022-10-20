if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        // console.log("sw registered");
        // console.log(registration);
    }).catch(error => {
        // console.log("sw registeration failed")
        // console.log(error)
    })
}

let body = document.querySelector("body");
const lightBtn = document.getElementById("light-mode");
const darkBtn = document.getElementById("dark-mode");
const addNote = document.getElementById("addnote");
const notesContainer = document.getElementById("notes-container");
const loadContainer = document.getElementById("load-container");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");
const colorP = document.getElementById("color-giver");
const editColorP = document.getElementById("edit-color-giver");
const addNotePickedColor = document.getElementById("picked-color");
const editNotePickedColor = document.getElementById("edit-picked-color");
// for edit purpose
const editNoteCcontainer = document.getElementById("editnote")
// opening
let openContainer = document.getElementById("open-note");
let openId = document.getElementById("open-id-passer");


// firebase code
const firebaseConfig = {
    apiKey: "AIzaSyDUEqBTqnof9xztexhh21biqbn_GU9kDGc",
    authDomain: "takenotes-34e1a.firebaseapp.com",
    databaseURL: "https://takenotes-34e1a-default-rtdb.firebaseio.com",
    projectId: "takenotes-34e1a",
    storageBucket: "takenotes-34e1a.appspot.com",
    messagingSenderId: "927772877424",
    appId: "1:927772877424:web:d594d6ebe238cb0ed18ab5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // localStorage.setItem("NotesId",user.uid);
        document.getElementById("uid").textContent = user.uid
        document.getElementById("username").innerHTML = user.displayName;
    }
    else {
        window.location = "/login.html"
    }
});


// function userDetails(user) {


//         const displayName = user.displayName;
//         const email = user.email;
//         const photoURL = user.photoURL;
//         const emailVerified = user.emailVerified;
//         console.log(displayName)
//         console.log(email)
//         console.log(photoURL)
//         console.log(emailVerified)


//         userToken = user.uid;
//         console.log(userToken)
// }

function updateNotes(userId, noteId, title, text, color) {
    // A post entry.
    firebase.database().ref('users/' + userId + "/" + noteId).set({
        title: title,
        text: text,
        color: color
    });
}










function logoutUser() {
    firebase.auth().signOut().then(() => {
        window.location = "/login.html";
        // localStorage.clear();
    }).catch((error) => {
        console.log(error)
    });
}


// writing notes to database
const database = firebase.database();
function saveNote(userId, addTitle, addText, dateTime, color) {
    firebase.database().ref('users/' + userId + "/" + dateTime).set({
        title: addTitle,
        text: addText,
        color: color
    });
}
// get date function

function getCurrentTime() {
    var date = new Date();
    return date.getTime();
}
// read notes from database


// intro screen

const splashScreen = document.getElementById("splash-screen");



setTimeout(() => {
    splashScreen.classList.add("hide-Splash-Screen")
}, 1500);

setInterval(function () {
    var notesContainer = document.getElementById("notes-container");
    if (notesContainer.innerHTML == "") {
        showNotes();
    }


}, 1000);
checkTheme();
// checking themes
function checkTheme() {
    let theme = localStorage.getItem("notesTheme")
    if (theme == "dark") {
        darkMode();
    }
    else {
        lightMode();
    }
}

// delete all notes
function deleteAllNotes() {
    localStorage.clear()
    showNotes();
}
// button functions 
function lightMode() {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme");
    lightBtn.style.display = "none";
    darkBtn.style.display = "block";
    localStorage.setItem("notesTheme", "light")

}
function darkMode() {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    lightBtn.style.display = "block";
    darkBtn.style.display = "none";
    localStorage.setItem("notesTheme", "dark")
}

function addnote() {
    addNote.style.display = "flex";
    console.log(window.innerWidth)
    if (window.innerWidth > 1024) {
        document.getElementById("container").style.display = "flex"
        notesContainer.classList.add("notes-grid");
        addNote.style.width = "50%"
    }
    else {
        document.getElementById("container").style.display = "static"
        addNote.style.width = "100%"
    }
    // notesContainer.style.display = "none";
    closeBtn.style.display = "block"
    addBtn.style.display = "none"
    openContainer.style.display = "none";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function closenote() {
    document.getElementById("container").style.display = "static"
    notesContainer.classList.remove("notes-grid");
    addNote.style.display = "none";
    notesContainer.style.display = "grid";
    addBtn.style.display = "block"
    closeBtn.style.display = "none"
    editNoteCcontainer.style.display = "none";
    openContainer.style.display = "none";
    showNotes();
}




// giving color


function giveColor(color) {
    colorP.innerHTML = color;
    addNotePickedColor.classList.add("addcolor");
    addNotePickedColor.style.backgroundColor = color;
    addNotePickedColor.innerHTML = " ";
    addNotePickedColor.style.boxShadow = "none";
    // edit color giver
    editColorP.innerHTML = color;
    editNotePickedColor.classList.add("addcolor");
    editNotePickedColor.style.backgroundColor = color;
    editNotePickedColor.innerHTML = " ";
    editNotePickedColor.style.boxShadow = "none";
    // passing color to open note

}

// adding note
// warnings

const addTitleWarning = document.getElementById("add-title-warning")
const addTextWarning = document.getElementById("add-text-warning")

let saveBtn = document.getElementById("savenote");
saveBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    let titleColor = colorP.innerHTML;
    const userId = document.getElementById("uid").innerText;

    if (titleColor == "") {
        titleColor = "var(--navbar)";


    }




    // checking if title is empty or note
    if (addTitle.value != "") {
        if (addText.value != "") {
            saveNote(userId, addTitle.value, addText.value, getCurrentTime(), titleColor)
            addTextWarning.style.display = "none";
            addTitleWarning.style.display = "none";
            addTitle.value = "";
            addText.value = "";

            showNotes();

        }
        else {
            addTextWarning.style.display = "block";

        }
    }
    else {
        addTitleWarning.style.display = "block";

    }



})

// editnote button function
const idPasser = document.getElementById("id-passer");
function editnoteBtn(id) {
    notesContainer.style.display = "none";
    editNoteCcontainer.style.display = "flex";
    closeBtn.style.display = "block";
    addNote.style.display = "none";
    addBtn.style.display = "none";
    openContainer.style.display = "none";
    idPasser.innerHTML = id;

    if (window.innerWidth > 1024) {
        document.getElementById("container").style.display = "flex"
        notesContainer.classList.add("notes-grid");
        editNoteCcontainer.style.width = "50%"
    }
    else {
        document.getElementById("container").style.display = "static"
        editNoteCcontainer.style.width = "100%"
    }

    let editTitle = document.getElementById("editTitle");
    let editText = document.getElementById("editText");

    // getting note from firebase for an edit
    var userId = document.getElementById("uid").innerHTML;
    const dbRef = firebase.database().ref("users/" + userId);
    dbRef.on("value", function (snapshot) {
        var notesObj = snapshot.val();
        var notesArray = Object.entries(notesObj)

        notesArray.forEach(element => {
            if (element[0] == id) {
                editTitle.value = element[1].title;
                editText.value = element[1].text;
                editNotePickedColor.style.backgroundColor = element[1].color;
                editColorP.innerHTML = element[1].color;

            }
        });
    })


    // for changing color of the edit title input 
    editNotePickedColor.classList.add("addcolor");

    editNotePickedColor.innerHTML = " ";
    editNotePickedColor.style.boxShadow = "none";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    showNotes();
}
// function run on pressing save button
// edit warning
const editTitleWarning = document.getElementById("edit-title-warning")
const editTextWarning = document.getElementById("edit-text-warning")
function editNote() {

    let noteId = idPasser.innerHTML;
    var userId = document.getElementById("uid").innerHTML;

    let editTitle = document.getElementById("editTitle");
    let editText = document.getElementById("editText");
    let titleColor = editColorP.innerHTML;


    if (titleColor == " ") {
        titleColor = "var(--navbar)";


    }


    if (editTitle.value != "") {
        if (editText.value != "") {

            updateNotes(userId, noteId, editTitle.value, editText.value, titleColor)

            editText.value = "";
            editTitle.value = "";
            editTitleWarning.style.display = "none";
            editTextWarning.style.display = "none";

            closenote();
            showNotes();
        }
        else {
            editTextWarning.style.display = "block";
        }
    }
    else {
        editTitleWarning.style.display = "block";

    }

}



// showing notes from local storage
function showNotes() {
    var userId = document.getElementById("uid").innerHTML;
    // var userId  = localStorage.getItem("NotesId");
    const dbRef = firebase.database().ref("users/" + userId);
    if (userId != "") {
        loadContainer.style.display = "none";
        dbRef.on("value", function (snapshot) {
            var notesObj = snapshot.val();

            if (notesObj != null) {
                var notesArray = Object.entries(notesObj);
                let note = "";
                notesArray.forEach(function (element) {

                    note += ` 
        
        <div class="notes-body" >
            <div class="notes-option" style="background-color:${element[1].color}">
             <h3 class="title" >${element[1].title}</h3>
              <li class="options-btn">
                <span class="material-symbols-outlined opt-btn">more_vert</span>
                <ul class="options">
                    <li onclick="editnoteBtn(this.id)" id="${element[0]}" class="edit-note"><span class="material-symbols-outlined">edit_note</span></li>
                    <li class="color-pick">
                        <span class="material-symbols-outlined">palette</span>
                        <ul class="color-option">
                            <li id="${element[0]}" onclick="getColor(this.id,'0')" class="color color-1"></li>
                            <li id="${element[0]}" onclick="getColor(this.id,'1')" class="color color-2"></li>
                            <li id="${element[0]}" onclick="getColor(this.id,'2')" class="color color-3"></li>
                            <li id="${element[0]}" onclick="getColor(this.id,'3')" class="color color-4"></li>
                            <li id="${element[0]}" onclick="getColor(this.id,'4')" class="color color-5"></li>
                        </ul>
                    </li>
                    <li  id="${element[0]}" onclick="deleteNote(this.id)" class="delete-note"><span class="material-symbols-outlined ">delete</span></li>
                </ul>
            </li>
        </div>
        
        <p onclick="openNoteBtn(${element[0]}) "> ${element[1].text}</p>
    </div>
    `
                })

                if (notesArray.length != 0) {
                    notesContainer.innerHTML = note;
                    notesContainer.style.display = "grid";

                }
            } else {
                notesContainer.style.display = "block";
                notesContainer.innerHTML = ` <div id="intro" class="intro" ">
                <div class="details">
                    <h1>Hey <span id="name"></span> , welcome to Takenotes cloud😊.</h1>
                    <p>You can add notes your here and access it from any where around the globe</p>
                    <p>Add your first note by clicking on <strong>Add</strong> note icon.</p>
                    <p>Your added notes will appear here.</p>
                </div>
            </div>`;
                const name = document.getElementById("username").innerHTML;
                document.getElementById("name").innerHTML = name

            }

        })
    } else {
        loadContainer.style.display = "block";
        loadContainer.innerHTML = ` <div id="intro" class="intro" ">
                <div class="details">
                <img style="height:200px;" src="/images/loading.gif" alt="">
                 <h3>Loading...</h3>
            
                </div>
            </div>`;

    }








}


// Function to delete a note
function deleteNote(index) {
    var noteId = index;
    var userId = document.getElementById("uid").innerHTML;
    if (noteId != " ") {

        const dbRef = firebase.database().ref("users/" + userId + "/" + noteId);
        dbRef.remove()
            .then(function () {
                console.log("Remove succeeded.")
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message)
            });
    }
    closeOpenNote()
    showNotes();

}

// get color 

function getColor(id, no) {

    var title;
    var text;
    let noteId = id
    const colors = ["#fb8ba7", "#4fc1ff", "#00bb79", "#ab5ba7", "#ffbc59"];
    // firebase code
    var userId = document.getElementById("uid").innerHTML;
    const dbRef = firebase.database().ref("users/" + userId);
    dbRef.on("value", function (snapshot) {
        var notesObj = snapshot.val();
        var notesArray = Object.entries(notesObj)

        notesArray.forEach(element => {
            if (element[0] == noteId) {
                title = element[1].title;
                text = element[1].text;
            }
        });
    })

    updateNotes(userId, noteId, title, text, colors[no])



    showNotes();
}

// open note


function openNoteBtn(id) {
    openId.innerHTML = id;
    openContainer.style.display = "flex";
    addNote.style.display = "none";
    editNoteCcontainer.style.display = "none";
    if (window.innerWidth > 1024) {
        document.getElementById("container").style.display = "flex"
        notesContainer.classList.add("notes-grid");
        openContainer.style.width = "50%"
    }
    else {
        document.getElementById("container").style.display = "static"
        openContainer.style.width = "100%"
    }
    notesContainer.style.display = "grid";
    openNote();
    showNotes();
}

function openNote() {
    let shortTitle = document.getElementById("short-title");
    let longTitle = document.getElementById("long-title");
    let openNoteText = document.getElementById("open-note-text");
    let titlebar = document.getElementById("titlebar")
    noteId = openId.innerHTML;

    // firebase code
    var userId = document.getElementById("uid").innerHTML;
    const dbRef = firebase.database().ref("users/" + userId);
    dbRef.on("value", function (snapshot) {
        var notesObj = snapshot.val();
        var notesArray = Object.entries(notesObj)

        notesArray.forEach(element => {
            if (element[0] == noteId) {
                shortTitle.innerHTML = element[1].title;
                longTitle.innerHTML = element[1].title;
                openNoteText.innerHTML = element[1].text;
                titlebar.style.backgroundColor = element[1].color;
            }
        });
    })





    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    showNotes();
}
function openColor(color) {
    noteId = openId.innerHTML;
    var title;
    var text;
    // firebase code
    var userId = document.getElementById("uid").innerHTML;
    const dbRef = firebase.database().ref("users/" + userId);
    dbRef.on("value", function (snapshot) {
        var notesObj = snapshot.val();
        var notesArray = Object.entries(notesObj)

        notesArray.forEach(element => {
            if (element[0] == noteId) {
                title = element[1].title;
                text = element[1].text;
            }
        });
    })

    updateNotes(userId, noteId, title, text, color)


    showNotes();
    openNote();
}
// deleting notes from open

function deleteNoteOpen() {
    id = openId.innerHTML;
    deleteNote(id);
    closeOpenNote();
    openContainer.style.display = "none";
    showNotes();
}

function closeOpenNote() {
    openContainer.style.display = "none";
    notesContainer.style.display = "grid";
    notesContainer.classList.remove("notes-grid");
    document.getElementById("container").style.display = "static"
    showNotes();
}

function editOpenNote() {
    id = openId.innerHTML;

    openContainer.style.display = "none";
    notesContainer.style.display = "grid";
    editnoteBtn(id);
    showNotes();
}

// search function 
const search = document.getElementById("search");
const openSearchBtn = document.getElementById("open-search")
const closeSearchBtn = document.getElementById("close-search")
function openSearch() {
    search.style.display = "flex";
    openSearchBtn.style.display = "none";
    closeSearchBtn.style.display = "block";
}
function closeSearch() {
    closeSearchBtn.style.display = "none";
    openSearchBtn.style.display = "block";
    search.style.display = "none";

}


function searchNote() {
    var filter, a, notes;
    let searchText = document.getElementById('searchTxt');
    const notesContainer = document.getElementById("notes-container");
    notes = notesContainer.getElementsByClassName("notes-body");
    filter = searchText.value.toUpperCase();

    for (let i = 0; i < notes.length; i++) {
        a = notes[i].getElementsByTagName("p")[0].innerText + " " + notes[i].getElementsByTagName("h3")[0].innerText
        if (a.toUpperCase().indexOf(filter) > -1) {
            notes[i].style.display = "block";
        } else {
            notes[i].style.display = "none";
        }

    }
   
}


showNotes()