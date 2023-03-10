let frame = document.getElementsByClassName("img_holder")[0];
let btn1 = document.getElementsByClassName("btn1")[0];
let input = document.getElementsByClassName("search_box")[0]
let next = document.getElementsByClassName("next")[0];
let index = 0;


function getImg() {
    const url = "https:/api.unsplash.com/search/photos/?query=" + input.value + "&per_page=24&client_id=TqGPBSCfI7Q23Jit8mrTdBsX0P_gRu5BhqzMRRT8Grg"

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else
                alert(response.status);
        })
        .then(data => {
            const imgs = [];
            const holder = [];
            for (let i = index; i < index+6; i++) {
                holder[i] = document.createElement("div");
                holder[i].className = "holder";
                imgs[i] = document.createElement("div");
                imgs[i].className = "img";
                imgs[i].style.backgroundImage = 'url(' + data.results[i].urls.raw + ')';
                btn1.addEventListener('click', () => {
                    for (i of frame.childNodes) {
                        frame.removeChild(i);
                    }
                })
                input.addEventListener('keydown', function (key) {
                    if (key.code === "Enter") {
                        for (i of frame.childNodes) {
                            frame.removeChild(i);
                        }
                    }
                })
                holder[i].appendChild(imgs[i]);
                frame.appendChild(holder[i]);
            }
        })
}


function next_btn() {
    index += 6;
    if (index < 18) {
        getImg();
    }
    else {
        next.classList.add("nex"); 
    }
}


function searchButton() {
    getImg();
    if(input.value){
        next.classList.remove("nex");   
    }
    else{
        alert("Enter text in the search box!");
    }
}

function pressEnter(key) {
    if (key.code === "Enter") {
        if(input.value){
            next.classList.remove("nex");   
        }
        else{
            alert("Enter text in the search box!");
        }
        getImg(); 
    }
}


btn1.addEventListener("click", searchButton);

input.addEventListener("keydown", function (key){
    pressEnter(key);
});

next.addEventListener("click", next_btn);



