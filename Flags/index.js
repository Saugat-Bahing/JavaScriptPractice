const frame = document.getElementsByClassName("flags")[0];
let display = document.getElementsByClassName("display")[0];
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

function conv_to_searchable(word){
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

console.log(conv_to_searchable("united states"))

function search_flag() {
    fetch("./countries.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const countries = Object.values(data);/*.map(x => x.toLocaleLowerCase());*/
            // console.log(countries)
            let sImg;
            let code;
            let label;
            let nodes=display.childNodes;
            search.addEventListener('click', () => {
                r.parentNode.removeChild(r);
                for (i of display.childNodes) {
                    display.removeChild(i);
                    console.log(i);
                }
            })
            input.addEventListener("keydown",(key)=>{
                let r=document.getElementsByClassName("label")[0];
                if(key.code=="Enter"){
                    r.parentNode.removeChild(r);
                    for (i of display.childNodes) {
                        display.removeChild(i);
                        console.log(i);
                    }
                }
            })
            let check=0;
            for (x of countries) {
                if (x == conv_to_searchable(input.value)) {
                    sImg=document.createElement("img");
                    sImg.className="hImg";
                    code=getKeyByValue(data, x[0].toUpperCase()+x.substring(1)).toLocaleLowerCase();
                    console.log(code);
                    sImg.src="https://flagcdn.com/256x192/" +code+ ".png";
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
get_flags()
search.addEventListener("click", search_flag);
input.addEventListener("keydown",(key)=>{
    if(key.code=="Enter"){
        search_flag();
    }
})