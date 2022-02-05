const frame = document.getElementsByClassName("flags")[0];
const display = document.getElementsByClassName("display")[0];
const search = document.getElementsByClassName("search")[0];
const input = document.getElementsByClassName("search_box")[0];

function get_flags() {
    fetch("./countries.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const keys = Object.keys(data);
            const keys_lower = keys.map((x) => x.toLocaleLowerCase());
            console.log(keys_lower[2]);
            let div;
            let img;
            let name;
            for (let i = 0; i < keys.length; i++) {
                name = document.createElement("div");
                name.className = "name";
                name.innerText = data[keys[i]];
                div = document.createElement("div");
                div.className = "imgHolder";
                img = document.createElement("img");
                img.className = "img"
                img.src = "https://flagcdn.com/256x192/" + keys_lower[i] + ".png";
                div.appendChild(img);
                div.appendChild(name);
                frame.appendChild(div);
            }

            // for(let i; i<2; i++){
            //     div = document.createElement("div");
            //     div.className("imgHolder");
            //     img = document.createElement("img");
            //     img.src="https://flagcdn.com/256x192/"+keys[i]+".png";
            //     div.appendChild(img);
            //     frame.appendChild(div);
            //     console.log("inside")
            // }
        });
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function search_flag() {
    fetch("./countries.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const countries = Object.values(data).map(x => x.toLocaleLowerCase());
            // console.log(countries)
            let sImg;
            let code;
            search.addEventListener('click', () => {
                for (i of display.childNodes) {
                    display.removeChild(i)
                }
            })
            for (x of countries) {
                if (x == input.value.toLocaleLowerCase()) {
                    sImg=document.createElement("img");
                    sImg.className="hImg";
                    code=getKeyByValue(data, x[0].toUpperCase()+x.substring(1)).toLocaleLowerCase();
                    console.log(code);
                    sImg.src="https://flagcdn.com/256x192/" +code+ ".png"
                    display.appendChild(sImg)
                }
            }

        })
}
get_flags()
search.addEventListener("click", search_flag)