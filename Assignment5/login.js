
function verifyUser() {
    let email = document.getElementById("email-id");
    let password = document.getElementById("password");

    if (email.value == "") {
        alert("Please provide your email!");
        email.focus();
        return false;
    }

    if (password.value == "") {
        alert("Please provide your password!");
        password.focus();
        return false;
    }

    if(localStorage.getItem("signUpDetails")==null){
        alert("You have to Sign Up first!");
        return false;
    }

    else if (notUser(email.value, password.value)){
        alert("Invalid Username or Password!");
        return false;
    }

    return true;
}

function notUser(testEmail, testPassword) {
    existingUser = JSON.parse(localStorage.getItem("signUpDetails"));
    for(let i=0; i<existingUser.length; i++){
        console.log(existingUser[i].email);
        if (existingUser[i].email==testEmail && existingUser[i].password==testPassword){
               return false;
        }
    }
    return true;
}