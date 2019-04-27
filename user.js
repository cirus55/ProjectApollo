
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

// function to authenticate that the user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //window.location.replace("user.html");
    }
    else {
        window.location.replace("index.html");
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

//---------------------------------------------

var selectedFile = "";

$("#file").on("change", function (event) {
    selectedFile = event.target.files[0];
})

$(document).on("click", "#upload-button", uploadFile);

// functio to upload image
function uploadFile() {

    //create a root reference 
    var fileName = selectedFile.name;
    console.log(fileName);
    user = firebase.auth().currentUser.uid;
    console.log(user);
    var storageRef = firebase.storage().ref("/userImages/" + "/" + user + "/" + fileName);
    var uploadTask = storageRef.put(selectedFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            database.ref("Temp/").push({
                downloadURL: downloadURL,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            //crear funcion

            //Face Detect

            var formDetect = new FormData();
            formDetect.append("api_key", "Xa-bWU0kHHmH7ql0pPImPBKOWgg4gq6Q");
            formDetect.append("image_url", downloadURL);
            formDetect.append("api_secret", "GfK5LW9MN8X_Fmq_BBSa9rnv-cwRjiuj");

            var settingsDetect = {
                "async": true,
                "crossDomain": true,
                "url": "https://api-us.faceplusplus.com/facepp/v3/detect",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": formDetect
            }

            $.ajax(settingsDetect).done(function (responseDetect) {
                console.log(responseDetect);
                var data = JSON.parse(responseDetect);

                //Once you have the face token you analize the photo

                var formAnalize = new FormData();
                formAnalize.append("api_key", "Xa-bWU0kHHmH7ql0pPImPBKOWgg4gq6Q");
                formAnalize.append("api_secret", "GfK5LW9MN8X_Fmq_BBSa9rnv-cwRjiuj");
                formAnalize.append("face_tokens", data.faces[0].face_token);
                formAnalize.append("return_attributes", "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus");

                var settingsAnalize = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api-us.faceplusplus.com/facepp/v3/face/analyze",
                    "method": "POST",
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": formAnalize
                }

                $.ajax(settingsAnalize).done(function (responseAnalize) {
                    console.log(responseAnalize);
                    var stats = JSON.parse(responseAnalize);
                    console.log(stats);

                    database.ref("userImages/" + user).push({
                        downloadURL: downloadURL,
                        gender: stats.faces[0].attributes.gender.value,
                        age: stats.faces[0].attributes.age.value,
                        femaleBeauty: stats.faces[0].attributes.beauty.female_score,
                        maleBeauty: stats.faces[0].attributes.beauty.female_score,
                        ethnicity: stats.faces[0].attributes.ethnicity.value,
                        skinStatusHealth: stats.faces[0].attributes.skinstatus.health,
                        skinStatusAcne: stats.faces[0].attributes.skinstatus.acne,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    });
                });
            });
        });
    });
}

//-------------------------------------------------------

var id = localStorage.getItem("uid");

// function to load user images
database.ref("userImages/" + id).on("child_added", function (snapshot) {

    var sv = snapshot.val();


    newDiv = $("<div>");
    newDiv.addClass("card");
    newDiv.attr("style", "width: 18rem;")
    newImg = $("<img>");
    newImg.attr("src", sv.downloadURL);
    newImg.addClass("card-img-top")
    newImg.attr("alt", "Failed to Load Image")
    newDiv.append(newImg);

    newDiv2 = $("<div>");
    newDiv2.addClass("card-body");
    newDiv.append(newDiv2);

    newh5 = $("<h5>");
    newh5.addClass("card-title");
    newh5.text("Model");
    newDiv2.append(newh5);
    newP = $("<p>");
    newP.text(`The Artificial Intelligence Algorithm 
        has generated the following characteristics for your photo:
        Gender: ${sv.gender}
        Age: ${sv.age}
        Female Beauty: ${sv.femaleBeauty}
        Male Beauty: ${sv.maleBeauty}
        Ethnicity: ${sv.ethnicity}
        Skin Health: ${sv.skinStatusHealth}
        Skin Acne: ${sv.skinStatusAcne}
     `)
    newDiv2.append(newP);
    newa = $("<a>");
    newa.attr("href", "#");
    newa.addClass("btn btn-primary");
    newa.text("Book Model");
    newDiv2.append(newa);

    $(".image-container").append(newDiv);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//----------------------------------------------------------

// var id = localStorage.getItem("uid");

// //function to load user stats
// database.ref("userData/" + id).on("child_added", function (snapshot) {

//     var sv = snapshot.val();

//     newDiv = $("<div>");
//     newP = $("<p>");
//     newP.text(`El algoritmo de Inteligencia Artificteristicas
//     ha generado las siguientes caracteristicas en base a sus fotos:
//     Genero: ${sv.gender}
//     Edad: ${sv.age}
//     Belleza Femenina: ${sv.femaleBeauty}
//     Belleza Masculina: ${sv.maleBeauty}
//     Etnicidad: ${sv.ethnicity}
//     Salud de Piel: ${sv.skinStatusHealth}
//     Acne de Piel: ${sv.skinStatusAcne}
//     `)
//     newDiv.append(newP);
//     $(".data-container").append(newDiv);

//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });


//-----------------------------------------------------------

var counter = 0;

//function to send message in chat

$(document).on("click", "#send-msg", sendMessage);

function sendMessage() {

    user = firebase.auth().currentUser.uid;
    var message = $("#message").val();
    var dateOfMsg = moment();
    var messageOrder = counter;
    $("#message").val("");

    database.ref("userChat/" + user).push({
        message: message
        //counter: counter
        //dateAdded: dateOfMsg
    });
};

//function to load messages in chat
database.ref("userChat/" + id).on("child_added", function (snapshot) {

    //counter = sv.counter;
    var sv = snapshot.val();
    var newDiv = $("<div>");
    var newImg = $("<img>");
    var newP = $("<p>");
    newP.text(sv.message);
    var newSpan = $("<span>");
    newSpan.text(sv.dateAdded);
    newDiv.append(newImg);
    newDiv.append(newP);
    newDiv.append(newSpan);
    $(".chat-container").append(newDiv);
    //console.log(counter);



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});