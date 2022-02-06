let frame = document.getElementsByClassName("img_holder")[0];
let btn1 = document.getElementsByClassName("btn1")[0];
let input = document.getElementsByClassName("search_box")[0]
let next = document.getElementsByClassName("next")[0];
let index = 0;

function getImg() {
    const url = "https:/api.unsplash.com/search/photos/?query=" + input.value + "&per_page=24&client_id=TqGPBSCfI7Q23Jit8mrTdBsX0P_gRu5BhqzMRRT8Grg"

    fetch(url)
        .then(response => {
            // console.log(response)
            if (response.ok) {
                // console.log(response.json())
                console.log("CLICK")
                return response.json()
            }
            else
                alert(response.status)
        })
        .then(data => {
            var data_copy=data;
            console.log(data)
            const imgs = [];
            const holder = [];
            for (let i = index; i < 6; i++) {
                holder[i] = document.createElement("div")
                holder[i].className = "holder";
                imgs[i] = document.createElement("div");
                imgs[i].className = "img";
                imgs[i].style.backgroundImage = 'url(' + data.results[i].urls.raw + ')';
                btn1.addEventListener('click', () => {
                    for (i of frame.childNodes) {
                        frame.removeChild(i)
                    }
                })
                input.addEventListener('keydown', function (key) {
                    if (key.code === "Enter") {
                        for (i of frame.childNodes) {
                            frame.removeChild(i)
                        }
                    }
                })
                holder[i].appendChild(imgs[i]);
                frame.appendChild(holder[i]);
            }
        })
    return data;
}

function next_btn() {
    let data=getImg()
    index+=6;
    if (index < 24) {
        const imgs = [];
        const holder = [];
        for (let i = index; i < index+6; i++) {
            holder[i] = document.createElement("div")
            holder[i].className = "holder";
            imgs[i] = document.createElement("div");
            imgs[i].className = "img";
            imgs[i].style.backgroundImage = 'url(' + data.results[i].urls.raw + ')';
            next.addEventListener('click', () => {
                for (i of frame.childNodes) {
                    frame.removeChild(i)
                }
            })
            holder[i].appendChild(imgs[i]);
            frame.appendChild(holder[i]);
        }
    }}

    btn1.addEventListener("click", getImg)
    btn1.addEventListener('click', () => { console.log("clicked") })
    input.addEventListener('keydown', function (key) {
        if (key.code === "Enter") {
            getImg();
        }
    })
    next.addEventListener("click", next_btn)



