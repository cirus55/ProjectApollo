
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

//-------------------------------------------------------

// function to load user images
database.ref("userImages/").on("child_added", function (snapshot) {

    var sv = snapshot.val();
    //console.log(sv);

    const keys = Object.keys(sv)
    //console.log(keys)

    for (var i = 0; i < keys.length; i++) {

        newDiv = $("<div>");
        newDiv.addClass("card");
        newDiv.attr("id", "grid-item");
        newDiv.attr("style", "width: 18rem;");
        newImg = $("<img>");
        newImg.attr("src", sv[keys[i]].downloadURL);
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
        // newP = $("<p>");
        // newP.text(`The Artificial Intelligence Algorithm 
        //     has generated the following characteristics for your photo:
        //     Gender: ${sv[keys[i]].gender}
        //     Age: ${sv[keys[i]].age}
        //     Female Beauty: ${sv[keys[i]].femaleBeauty}
        //     Male Beauty: ${sv[keys[i]].maleBeauty}
        //     Ethnicity: ${sv[keys[i]].ethnicity}
        //     Skin Health: ${sv[keys[i]].skinStatusHealth}
        //     Skin Acne: ${sv[keys[i]].skinStatusAcne}
        //  `)
        // newDiv2.append(newP);

        newP = $("<p>");
        newP.text(`The Artificial Intelligence Algorithm 
            has generated the following characteristics for your photo:
         `)
        newDiv2.append(newP);

        newUL = $("<ul>");
        newLI1 = $("<li>");
        newLI1.text("Gender: " + sv[keys[i]].gender);
        newUL.append(newLI1);

        newLI2 = $("<li>");
        newLI2.text("Age: " + sv[keys[i]].age);
        newUL.append(newLI2);

        newLI3 = $("<li>");
        newLI3.text("Female Beauty: " + sv[keys[i]].femaleBeauty);
        newUL.append(newLI3);

        newLI4 = $("<li>");
        newLI4.text("Male Beauty: " + sv[keys[i]].maleBeauty);
        newUL.append(newLI4);

        newLI5 = $("<li>");
        newLI5.text("Ethnicity: " + sv[keys[i]].ethnicity);
        newUL.append(newLI5);

        newLI6 = $("<li>");
        newLI6.text("Skin Status Health: " + sv[keys[i]].skinStatusHealth);
        newUL.append(newLI6);

        newLI7 = $("<li>");
        newLI7.text("Skin Status Acne: " + sv[keys[i]].skinStatusAcne);
        newUL.append(newLI7);

        newDiv2.append(newUL);

        newa = $("<a>");
        newa.attr("href", "#");
        newa.addClass("btn btn-outline-light");
        newa.text("Book Model");
        newDiv2.append(newa);

        $(".grid-container").append(newDiv);

    }

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//----------------------------------------------------------

$(document).on("click", "#filter", filterModels);

function filterModels() {
    database.ref("userImages/").on("value", function (snapshot) {

        $(".grid-container").empty();
        newGridContainer = $("<div>");
        newGridContainer.addClass("filtered-grid-container");
        $(".container").prepend(newGridContainer);

        var sv = snapshot.val();
        const keys = Object.keys(sv);

        genderFilter = $("#gender").val().trim();
        ageFilter = $("#age").val().trim();
        beautyFilter = $("#beauty").val().trim();
        ethnicityFilter = $("#ethnicity").val().trim();


        for (var i = 0; i < keys.length; i++) {

            var userphotos = sv[keys[i]];
            const subkeys = Object.keys(userphotos);

            for (var x = 0; x < subkeys.length; x++) {

                var condArray = [];

                if (genderFilter !== "") {
                    condArray.push("userphotos[subkeys[x]].gender ==  genderFilter");
                }

                if (ageFilter !== "") {
                    condArray.push("userphotos[subkeys[x]].age <  ageFilter");
                }

                if (beautyFilter !== "") {
                    condArray.push("userphotos[subkeys[x]].femaleBeauty >  beautyFilter");
                }

                if (ethnicityFilter !== "") {
                    condArray.push("userphotos[subkeys[x]].ethnicity ==  ethnicityFilter");
                }

                console.log(condArray.join(" & "));

                if (eval(condArray.join(" & "))) {

                    console.log("blah");

                    newDiv = $("<div>");
                    newDiv.addClass("card");
                    newDiv.attr("id", "grid-item");
                    newDiv.attr("style", "width: 18rem;");
                    newImg = $("<img>");
                    newImg.attr("src", userphotos[subkeys[x]].downloadURL);
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
                        Gender: ${userphotos[subkeys[x]].gender}
                        Age: ${userphotos[subkeys[x]].age}
                        Female Beauty: ${userphotos[subkeys[x]].femaleBeauty}
                        Male Beauty: ${userphotos[subkeys[x]].maleBeauty}
                        Ethnicity: ${userphotos[subkeys[x]].ethnicity}
                        Skin Health: ${userphotos[subkeys[x]].skinStatusHealth}
                        Skin Acne: ${userphotos[subkeys[x]].skinStatusAcne}
                     `)
                    newDiv2.append(newP);
                    newa = $("<a>");
                    newa.attr("href", "#");
                    newa.addClass("btn btn-outline-light");
                    newa.text("Book Model");
                    newDiv2.append(newa);
                    $(".filtered-grid-container").append(newDiv);
                }

            }
        }

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

//----------------------------------------------------------

// var counter = 0;

// //function to send message in chat

// $(document).on("click", "#send-msg", sendMessage);

// function sendMessage() {

//     var message = $("#message").val();
//     var dateOfMsg = moment();
//     var messageOrder = counter;
//     $("#message").val("");

//     database.ref("userChat/generic").push({
//         message: message
//         //counter: counter
//         //dateAdded: dateOfMsg
//     });
// };

// //function to load messages in chat
// database.ref("userChat/generic/").on("child_added", function (snapshot) {

//     //counter = sv.counter;
//     var sv = snapshot.val();
//     var newDiv = $("<div>");
//     var newImg = $("<img>");
//     var newP = $("<p>");
//     newP.text(sv.message);
//     var newSpan = $("<span>");
//     newSpan.text(sv.dateAdded);
//     newDiv.append(newImg);
//     newDiv.append(newP);
//     newDiv.append(newSpan);
//     $(".chat-container").append(newDiv);
//     //console.log(counter);

//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });


//-------------------------------------------------------------

$(document).on("click", "#home", gotoHome);

function gotoHome() {
    window.location.assign("index.html");
}