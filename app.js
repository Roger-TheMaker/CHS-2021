const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

var firebaseConfig = {
  projectId: "chs-project-fe978",
  appId: "1:1077008672831:web:968aff7131573c9974b08a",
  databaseURL: "https://chs-project-fe978-default-rtdb.firebaseio.com",
  storageBucket: "chs-project-fe978.appspot.com",
  apiKey: "AIzaSyDGhmGzemKTrDdcE-yTLp0PkMnmIwIfE_k",
  authDomain: "chs-project-fe978.firebaseapp.com",
  messagingSenderId: "1077008672831",
  measurementId: "G-WX1R18ZGK9",
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    window.location = "MeasureHeartBeat.html";
    // ...
  } else {
    // User is signed out
    // ...
  }
});

let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  console.log("clicked");

  var email = document.getElementById("inputEmail");
  var password = document.getElementById("inputPassword");
  console.log(email.value, password.value);
  if (email.value === "" || password.value === "") {
    alert("Inputs should not be empty");
  }
  if (password.value.length < 6) {
    alert("Passwords should have a minimum length of 6!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // location.reload();
      // Signed in
      var user = userCredential.user;
      console.log("user", user.email);
      window.location = "MeasureHeartBeat.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // alert("error code", errorCode)
      alert(errorMessage);
    });
});

let RegisterForm = document.getElementById("registerForm");

RegisterForm.addEventListener("submit", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  console.log("clicked");

  var email = document.getElementById("inputEmail1");
  var password = document.getElementById("inputPassword1");
  var passwordConfirm = document.getElementById("inputPasswordConfirm1");
  if (
    email.value === "" ||
    password.value === "" ||
    passwordConfirm.value === ""
  ) {
    alert("Inputs should not be empty");
  }
  if (password.value.length < 6) {
    alert("Passwords should have a minimum length of 6!");
    return;
  }
  if (password.value !== passwordConfirm.value) {
    alert("Passwords do not match!");
    return;
  }
  auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("user", user.email);
      window.location = "MeasureHeartBeat.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error code", errorCode);
      console.log("error Message", errorMessage);
      alert(errorMessage);
    });
});

function googleAuth() {
  console.log("clicked");
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);

  firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...

        // localStorage.setItem("token", credential.accessToken);
      }
      // The signed-in user info.
      var user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(error);
    });
}
