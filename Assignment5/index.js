const submit = document.getElementById("submit");
const signUpForm = document.getElementsByClassName("signup")[0];
let user;
let signUpDetails;
let existingUser;


function validateSignUp() {

    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email-id");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");

    if (firstName.value == "") {

        alert("Please provide your First Name!");
        firstName.focus();
        return false;
    }

    if (lastName.value == "") {

        alert("Please provide your Last Name!");
        lastName.focus();
        return false;
    }
    if (email.value == "") {

        alert("Please provide your email!");
        email.focus();
        return false;
    }

    if (username.value == "") {

        alert("Please provide your username!");
        username.focus();
        return false;
    }

    if (password.value == "") {

        alert("Please provide your password!");
        password.focus();
        return false;
    }

    if(password.value.length<7){

        alert("Please make the password longer!");
        password.focus();
        return false;
    }

    if (confirmPassword.value != document.getElementById("password").value) {

        alert("Password doesn't match!");
        confirmPassword.focus();
        return false;
    }

    if(localStorage.getItem("signUpDetails")==null){

        localStorage.setItem("signUpDetails", "[]");
        user = new userData(firstName.value, lastName.value, email.value, username.value, password.value); 
        signUpDetails = JSON.parse(localStorage.getItem("signUpDetails"));
        signUpDetails.push(user);
        localStorage.setItem("signUpDetails", JSON.stringify(signUpDetails));
    }

    else if (isSignedUp(email.value)){

        alert("You are already Signed Up!");
        return false;
    }

    else {

        user = new userData(firstName.value, lastName.value, email.value, username.value, password.value); 
        signUpDetails = JSON.parse(localStorage.getItem("signUpDetails"));
        signUpDetails.push(user);
        localStorage.setItem("signUpDetails", JSON.stringify(signUpDetails));
    }

    return true;

}

function userData(firstName, lastName, email, username, password) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    }

function isSignedUp(testEmail) {
    
    existingUser = JSON.parse(localStorage.getItem("signUpDetails"));
    for(let i=0; i<existingUser.length; i++){
        console.log(existingUser[i].email);
        if(existingUser[i].email==testEmail){
            return true;
        }
    }
    return false;
}

let a = new userData("a", "b", "c", "d", "e")
console.log(a)
