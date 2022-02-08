const flag_dis = document.getElementsByClassName("flag_dis")[0];
const input = document.getElementsByClassName("text")[0];
let flag;
let searched = [];
const submit = document.getElementsByClassName("submit")[0];
let score = 0;
const start_button=document.getElementsByClassName("start_btn")[0];
const start_display=document.getElementsByClassName("start_dis")[0];
const play_board=document.getElementsByClassName("play")[0];
const score_board=document.getElementsByClassName("score_board")[0];
const loser=document.getElementsByClassName("loser")[0];
const loser_board=document.getElementsByClassName("loser_board")[0];
const correct_ans=document.getElementsByClassName("correct_ans")[0];
const your_score=document.getElementsByClassName("your_score")[0];
const play_again=document.getElementsByClassName("play_again")[0];

function get_random_flag() {
    let random = Math.random() * 1000;
    while (true) {
        if (searched.includes(random) == false) {
            if (random < 252) {
                searched.push(parseInt(random));
                console.log(searched)
                break
            }
            else {
                random = Math.random() * 1000;

            }
        }
    }
    return parseInt(random)
}

function display_flag() {
    score_board.innerText="SCORE: "+score;
    flag = get_random_flag();
    fetch("./countries.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const keys = Object.keys(data);
            const keys_lower = keys.map((x) => x.toLocaleLowerCase());
            console.log(keys_lower.length);
            let div;
            let img;
            div = document.createElement("div");
            div.className = "imgHolder1";
            img = document.createElement("img");
            img.className = "imgg"
            img.src = "https://flagcdn.com/256x192/" + keys_lower[flag] + ".png";
            div.appendChild(img);
            flag_dis.appendChild(div);
        });
    // return flag
}

function check() {
    console.log(searched.at(-1), "i");
    fetch("./countries.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const values = Object.values(data);
            const values_lower = values.map((x) => x.toLocaleLowerCase());
            if(input.value==""){
                alert("Enter Country Name")
            }
            else if (input.value.toLocaleLowerCase() == values_lower[searched.at(-1)]) {
                flag_dis.removeChild(flag_dis.childNodes[0]);
                score += 1; 
                display_flag();
                console.log("correct"); 
                input.value="";
            }
            else {
                // console.log("Correct ans: " + values[searched.at(-1)])
                input.value="";
                your_score.innerText="Your Score: "+score;
                loser.classList.remove("loser_vis");
                correct_ans.innerText="Correct answer: "+values[searched.at(-1)];
            }
        });

}

display_flag()
// check()

submit.addEventListener("click", check);
input.addEventListener("keydown", function (key){
    if (key.code == "Enter") {
        check();
    }
})

start_button.addEventListener("click",function(){
        start_display.classList.add("start_inv");
        play_board.classList.add("play_vis");
})

play_again.addEventListener("click", function(){
    start_display.classList.remove("start_inv");
    play_board.classList.remove("play_vis");
    loser.classList.add("loser_vis");
    score=0;
})



