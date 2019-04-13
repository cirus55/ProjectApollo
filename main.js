var attemp = 3;

function validate(){
    var username = $("#username-reg").val();
    var password = $("#password-reg").val();

    if (username == userBase && password == userPassBase){
        windows.location = "success.html";
        return false;
    }

    else {
        attemp --;
        //display wrong password
        if (attemp == 0){

            $("#username-reg").disabled = true;
            $("#password-reg").disabled = true;

            return false
        }
    }
}