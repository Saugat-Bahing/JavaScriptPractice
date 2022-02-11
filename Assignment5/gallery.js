const details = document.getElementsByClassName("details")[0];
const imgHolder = document.getElementsByClassName("img_hold")[0];
let empId;
let fullName;
let post;
let ind = 0;
const right = document.getElementById("right_icon");
const left = document.getElementById("left_icon");
const logout = document.getElementsByTagName("h3")[0];
let imgs;
let outside;
let leftCount;
let rightCount;

function createDetails() {
    let empId = document.createElement("div");
    let fullName = document.createElement("div");
    let post = document.createElement("div");
    empId.className = "empId";
    fullName.className = "fullName";
    post.className = "post";
    details.appendChild(empId);
    details.appendChild(fullName);
    details.appendChild(post);
}

function getData() {
    fetch("./employee.json")
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            empId = data['Employees'][ind].employeeCode;
            fullName = data['Employees'][ind].FullName;
            post = data['Employees'][ind].jobTitleName;
            details.childNodes[0].innerText = "Employee ID: " + empId;
            details.childNodes[1].innerText = "Full Name: " + fullName;
            details.childNodes[2].innerText = "Designation: " + post;
            console.log(empId, fullName, post);
            imgs = document.createElement("img");
            imgs.src = data.Employees[ind].url;
            imgs.className = "img";
            outside = document.createElement("div");
            outside.className = "outside";
            if (leftCount == 1) {
                outside.classList.add("out_left");
            }
            if (rightCount == 1) {
                outside.classList.add("out_right");
            }
            outside.classList.add("out" + String(ind));
            outside.appendChild(imgs);
            imgHolder.appendChild(outside);
            leftCount = 0;
            rightCount = 0;
        })
}

let previousElement;
function leftClick() {
    leftCount = 1;
    getData();
    previousElement = document.getElementsByClassName("out" + String(ind))[0];
    ind += 1;
    imgHolder.removeChild(previousElement);
    if (ind == 5) {
        ind = 0;
    }
}

function rightClick() {
    rightCount = 1;
    getData();
    previousElement = document.getElementsByClassName("out" + String(ind))[0];
    ind -= 1;
    imgHolder.removeChild(previousElement);
    if (ind < 0) {
        ind = 4;
    }
}

function blockBackNavigation() {
    window.location.replace('login.html');
}


createDetails()
getData();

left.addEventListener("click", leftClick);
right.addEventListener("click", rightClick);
logout.addEventListener("click", blockBackNavigation)

