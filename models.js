
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
        newP = $("<p>");
        newP.text(`The Artificial Intelligence Algorithm 
            has generated the following characteristics for your photo:
            Gender: ${sv[keys[i]].gender}
            Age: ${sv[keys[i]].age}
            Female Beauty: ${sv[keys[i]].femaleBeauty}
            Male Beauty: ${sv[keys[i]].maleBeauty}
            Ethnicity: ${sv[keys[i]].ethnicity}
            Skin Health: ${sv[keys[i]].skinStatusHealth}
            Skin Acne: ${sv[keys[i]].skinStatusAcne}
         `)
        newDiv2.append(newP);
        newa = $("<a>");
        newa.attr("href", "#");
        newa.addClass("btn btn-primary");
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

        $("#grid-container").empty();
        newGridContainer = $("<div>");
        newGridContainer.addClass("grid-container");
        $(".container").append(newGridContainer);

        var sv = snapshot.val();
        //console.log(sv);

        const keys = Object.keys(sv);
        //console.log(keys);

        genderFilter = $("#gender").val().trim();
        ageFilter = $("#age").val().trim();
        beautyFilter = $("#beauty").val().trim();
        ethnicityFilter = $("#ethnicity").val().trim();

        filterString = "";




        for (var i = 0; i < keys.length; i++) {

            //console.log(sv[keys[i]]);

            var userphotos = sv[keys[i]];

            const subkeys = Object.keys(userphotos);

            //console.log(subkeys);

            var condArray = [];

            for (var x = 0; x < subkeys.length; x++) {

                if (genderFilter !== "") {
                    filterString = "userphotos[subkeys[x]].gender ==  genderFilter";
                    condArray.push("userphotos[subkeys[x]].gender ==  genderFilter");
                }

                if (ageFilter !== "") {
                    filterString = filterString + " & userphotos[subkeys[x]].genderFilter ==" + ageFilter;
                    condArray.push("userphotos[subkeys[x]].age ==  ageFilter");
                }

                if (beautyFilter !== "") {
                    filterString = filterString + " & userphotos[subkeys[x]].beautyFilter ==" + beautyFilter;
                    condArray.push("userphotos[subkeys[x]].femalebeauty ==  beautyFilter");
                }

                if (ethnicityFilter !== "") {
                    filterString = filterString + " & userphotos[subkeys[x]].ethnicityFilter ==" + ethnicityFilter;
                    condArray.push("userphotos[subkeys[x]].ethnicity ==  ethnicityFilter");
                }

                console.log(userphotos[subkeys[x]].gender, genderFilter);
                console.log(eval(filterString));
                //console.log(userphotos[subkeys[x]].gender);
                //console.log(subkeys);

                console.log(condArray.join(" & "));

                if (eval(filterString)) {
                //if (eval(condArray)) {
                    console.log(userphotos[subkeys[i]].gender);
                    newDiv = $("<div>");
                    newDiv.addClass("card");
                    newDiv.attr("id", "grid-item");
                    newDiv.attr("style", "width: 18rem;");
                    newImg = $("<img>");
                    newImg.attr("src", userphotos[subkeys[i]].downloadURL);
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
                        Gender: ${userphotos[subkeys[i]].gender}
                        Age: ${userphotos[subkeys[i]].age}
                        Female Beauty: ${userphotos[subkeys[i]].femaleBeauty}
                        Male Beauty: ${userphotos[subkeys[i]].maleBeauty}
                        Ethnicity: ${userphotos[subkeys[i]].ethnicity}
                        Skin Health: ${userphotos[subkeys[i]].skinStatusHealth}
                        Skin Acne: ${userphotos[subkeys[i]].skinStatusAcne}
                     `)
                    newDiv2.append(newP);
                    newa = $("<a>");
                    newa.attr("href", "#");
                    newa.addClass("btn btn-primary");
                    newa.text("Book Model");
                    newDiv2.append(newa);

                    $(".grid-container").append(newDiv);
                }

            }
        }

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

//----------------------------------------------------------

var counter = 0;

//function to send message in chat

$(document).on("click", "#send-msg", sendMessage);

function sendMessage() {

    var message = $("#message").val();
    var dateOfMsg = moment();
    var messageOrder = counter;
    $("#message").val("");

    database.ref("userChat/generic").push({
        message: message
        //counter: counter
        //dateAdded: dateOfMsg
    });
};

//function to load messages in chat
database.ref("userChat/generic/").on("child_added", function (snapshot) {

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