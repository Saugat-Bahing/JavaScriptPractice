const details = document.getElementsByClassName("details")[0];
const imgHolder=document.getElementsByClassName("img_hold")[0];
let empId;
let fullName;
let post;
let ind = 0;
const right=document.getElementById("right_icon");
const left=document.getElementById("left_icon");
const logout=document.getElementsByTagName("h3")[0];
let imgs;
let outside;
let leftCount;
let rightCount;

function create_details() {
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

function get_data() {
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
            imgs=document.createElement("img");
            imgs.src=data.Employees[ind].url;
            imgs.className="img";
            outside=document.createElement("div");
            outside.className="outside";
            if(leftCount==1){
                outside.classList.add("out_left");  
            }
            if(rightCount==1){
                outside.classList.add("out_right");  
            }
            outside.classList.add("out"+String(ind));
            outside.appendChild(imgs);
            imgHolder.appendChild(outside);
            leftCount=0;
            rightCount=0;
        })
}

let previous_ele;
function left_click(){
    leftCount=1;
    get_data();
    previous_ele=document.getElementsByClassName("out"+String(ind))[0];
    ind+=1;
    imgHolder.removeChild(previous_ele);
    if(ind==5){
        ind=0;
}}

function right_click(){
    rightCount=1;
    get_data();
    previous_ele=document.getElementsByClassName("out"+String(ind))[0];
    ind-=1;
    imgHolder.removeChild(previous_ele);
    if(ind<0){
        ind=4;
}}

function blockBackNavigation(){   
    window.location.replace('index.html');
}


create_details()
get_data();

left.addEventListener("click", left_click);
right.addEventListener("click", right_click);
logout.addEventListener("click", blockBackNavigation)
    
