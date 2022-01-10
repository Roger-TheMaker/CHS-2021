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
