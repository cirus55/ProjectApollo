// Initialize Firebase
var config = {
    apiKey: "AIzaSyCntWyn-Aujj6m5CAnvDR1SRMs6rNuWCd0",
    authDomain: "apollo-12861.firebaseapp.com",
    databaseURL: "https://apollo-12861.firebaseio.com",
    projectId: "apollo-12861",
    storageBucket: "apollo-12861.appspot.com",
    messagingSenderId: "264918660419"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//-----------------------------------------------

var loginDiv = $("#login-div");
var registerDiv = $("#register-div");
registerDiv.hide();

$(document).on("click", ".header-div", loginregister);

// function to logout
function loginregister() {

    console.log($(this).attr("id"));
    
    if ($(this).attr("id") == "login"){
        loginDiv.hide();
        registerDiv.show();
    }
    else{
        loginDiv.show();
        registerDiv.hide();
    }

}

//-----------------------------------------------

$(document).on("click", "#create-user", createUser);

// function to create user
function createUser() {

    email = $("#email-input").val().trim();
    password = $("#password-input").val().trim();
    console.log("email" + email + "pass" + password);

    firebase.auth().createUserWithEmailAndPassword(email, password).then
        (function (firebaseUser) {
            console.log(firebaseUser.user);
        })
        .catch(function (error) {
            console.log(error);
        });
};

//-----------------------------------------------

$(document).on("click", "#login-user", login);

// function to login
function login() {

    email = $("#email-reg").val().trim();
    password = $("#password-reg").val().trim();
    console.log("email: " + email + " pass: " + password);

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        //Handle Errors here
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });
}

//-----------------------------------------------

// function to authenticate that the user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        localStorage.setItem('uid', user.uid);
        window.location.replace("user.html");
    }
    else {
        //window.location.replace("index.html");
    }
});

//----------------------------------------------

$(document).on("click", "#logout-user", logout);

// function to logout
function logout() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location.assign("index.html");
    }).catch(function (error) {
        // An error happened.
    });
}

//----------------------------------------------

