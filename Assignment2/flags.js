const frame = document.getElementsByClassName("flags")[0];
const display = document.getElementsByClassName("display")[0];
const search = document.getElementsByClassName("search")[0];
const input = document.getElementsByClassName("search_box")[0];


function getFlags() {
    fetch("./countries.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const keys = Object.keys(data);
            const keys_lower = keys.map((x) => x.toLocaleLowerCase());
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
        });
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }


function convToSearchable(word){
    let converted;
    converted=word[0].toUpperCase()+word.substring(1);
    for(let i=0; i<word.length; i++){
        if(word[i]==" "){
            if(word[i+1]==undefined){
                converted=converted.substring(0,i)
            }
            else{
                converted=converted.substring(0, i+1)+converted[i+1].toUpperCase()+converted.substring(i+2);
            }
        }
    }
    return converted;
}


function searchFlag() {
    fetch("./countries.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const countries = Object.values(data);
            let sImg;
            let code;
            let label;
            let nodes=display.childNodes;
            search.addEventListener('click', () => {
                r.parentNode.removeChild(r);
                for (i of display.childNodes) {
                    display.removeChild(i);
                }
            })
            input.addEventListener("keydown",(key)=>{
                let r=document.getElementsByClassName("label")[0];
                if(key.code=="Enter"){
                    r.parentNode.removeChild(r);
                    for (i of display.childNodes) {
                        display.removeChild(i);
                    }
                }
            })
            let check=0;
            for (x of countries) {
                if (x == convToSearchable(input.value)) {
                    sImg=document.createElement("img");
                    sImg.className="hImg";
                    code=getKeyByValue(data, x[0].toUpperCase()+x.substring(1)).toLocaleLowerCase();
                    sImg.src="https://flagcdn.com/256x192/" +code+ ".png";
                    sImg.alt="could not find flag image";
                    label=document.createElement("div");
                    label.className="label";
                    label.innerText=x[0].toUpperCase()+x.substring(1);
                    display.appendChild(sImg);
                    display.appendChild(label);
                    check=1;
                }
            }
            if(check==0){
                label=document.createElement("div");
                label.className="label";
                label.innerText="Not Found";
                display.appendChild(label);
            }

            input.value="";

        })
}


getFlags();
search.addEventListener("click", searchFlag);
input.addEventListener("keydown",(key)=>{
    if(key.code=="Enter"){
        searchFlag();
    }
})

