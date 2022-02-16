let emailPrompt = document.getElementById("email-prompt");
let passwordPrompt = document.getElementById("password-prompt");


function verifyUser() {

    let email = document.getElementById("email-id");
    let password = document.getElementById("password");

    if (email.value == "") {
        emailPrompt.classList.add("make-div-visible")
        email.focus();
        return false;
    }

    if (password.value == "") {

        passwordPrompt.classList.add("make-div-visible")
        password.focus();
        return false;
    }

    if (localStorage.getItem("signUpDetails") == null) {

        alert("You have to Sign Up first!");
        return false;
    }

    else if (notUser(email.value, password.value)) {
        
        alert("Invalid Username or Password!");
        return false;
    }

    return true;
}

function notUser(testEmail, testPassword) {

    existingUser = JSON.parse(localStorage.getItem("signUpDetails"));
    for (let i = 0; i < existingUser.length; i++) {
        console.log(existingUser[i].email);
        if (existingUser[i].email == testEmail && existingUser[i].password == testPassword) {
            return false;
        }
    }
    return true;
}

function removeClassPassword() {

    passwordPrompt.classList.remove("make-div-visible")
}

function removeClassEmail() {

    emailPrompt.classList.remove("make-div-visible")
}
