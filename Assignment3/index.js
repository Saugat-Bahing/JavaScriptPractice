const section = document.getElementsByClassName("section")[0];
const imgH = document.getElementsByClassName("imgHolder1")[0];

function get_flags_home() {
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
                div.className = "imgHolder1";
                img = document.createElement("img");
                img.className = "imgg"
                img.src = "https://flagcdn.com/256x192/" + keys_lower[i] + ".png";
                div.appendChild(img);
                div.appendChild(name);
                section.appendChild(div);
            }
        });
}

function animate(){
}

get_flags_home();