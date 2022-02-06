const scene=document.getElementsByClassName("scene")[0]

function create_child(parent, i){
    let clas="cube"+String(i);
    let createdElement=document.createElement("div");
    createdElement.className=clas;
    createdElement.classList.add("cube");
    parent.appendChild(createdElement);
}

function create_div(parent){
    for(let i=0; i<27; i++){
        create_child(parent, i);
    }
}

function create_face(parent, i){
    let faceClass="face"+String(i);
    let createdFace=document.createElement("div");
    createdFace.className=faceClass;
    createdFace.classList.add("face")
    parent.appendChild(createdFace);
}

function add_face(){
    let cubeSeg;
    for(let i=0; i<27; i++){
        cubeSeg=document.getElementsByClassName("cube"+String(i))[0];
        for(let j=0; j<6; j++){
            create_face(cubeSeg, j);
        }
    }
}

create_div(scene);
add_face();