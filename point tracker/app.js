// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getDatabase, set, ref, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC0akkEwN-EjXT3sl5a3R2GyoRHjfqlME",
  authDomain: "pointtracker-cd703.firebaseapp.com",
  projectId: "pointtracker-cd703",
  storageBucket: "pointtracker-cd703.appspot.com",
  messagingSenderId: "883742105926",
  appId: "1:883742105926:web:b4d194b189973385e04547",
  measurementId: "G-06V5EHNXJZ"
};

//  Initialize Firebase
let app = initializeApp(firebaseConfig);
let auth = getAuth(app);
let DATABASE = getDatabase(app);
let userName = document.getElementById("userName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
window.signUp = function () {
  let user = {
    email: email.value,
    password: password.value,
    userName: userName.value
  }
  // console.log("running");
  if (password.value != confirmPassword.value) {
    document.getElementById("error1").innerHTML = "password and confirm password must be same";
  } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(function (success) {
        console.log("success");
        let refLog = ref(DATABASE);
        let refLogData = push(refLog).key;
        user.id = refLogData;
        let refer = ref(DATABASE, `users/${user.id}`);
        set(refer, user)
          .then(function () {
            console.log("User data saved in the database");
            userName = "";
            email.value = "";
            password.value = "";
            confirmPassword.value = "";
            document.getElementById("error1").innerHTML = "";
            window.location.replace("./pointTrack.html");
          })
      })
      .catch(function (error) {
        console.log(error.code);
        if (error.code === "auth/weak-password") {
          document.getElementById("error").innerHTML = "Password should be atleast 8 characters";
        } else if (error.code == "auth/email-already-in-use") {
          document.getElementById("error2").innerHTML = "Email already in use........";
        }
        else {
          document.getElementById("error").style.display = "none";
          document.getElementById("error2").style.display = "none";
        }
      })
  }
};

//=============== signIn===================
window.signIn = function () {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(function (success) {
      window.location.replace("./pointTrack.html")
    })
    .catch(function (error) {
      if (error.code == "auth/invalid-login-credentials") {
        document.getElementById("error3").innerHTML = "Invalid Email.........";
      }
    })
};    
