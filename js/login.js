// firebase code
// Your web app's Firebase configuration
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
// provider
var provider = new firebase.auth.GoogleAuthProvider();
// if user already signed in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location = "/"
    }
});


// login with google
function GoogleLogin(){
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    console.log(token)
    // The signed-in user info.
    var user = result.user;
    console.log(user.displayName)
    window.location="/";
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }


// splash screen code

const splashScreen = document.getElementById("splash-screen");
let body = document.querySelector("body");
setTimeout(() => {
    splashScreen.classList.add("hide-Splash-Screen")
}, 1500);

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

function lightMode() {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme");
    localStorage.setItem("notesTheme", "light")

}
function darkMode() {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    localStorage.setItem("notesTheme", "dark")
}

// login with google

const googleLogin = document.getElementById("googleLogin");

googleLogin.addEventListener("click",()=>{
   GoogleLogin();
})