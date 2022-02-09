const screen = document.getElementsByClassName("screen")[0];
const keyboard = document.getElementsByClassName("keyboard")[0];
const lower = document.getElementsByClassName("lower")[0];
const upper = document.getElementsByClassName("upper")[0];
const keyys = document.getElementsByClassName("keys");
let lower_dis = "";
let upper_dis = "";
let state = 0; 
let checked = 0;

lower.innerText = "0";

function create_keys() {

    let clas = ["C", "plus_minus", "back_space", "divide", "_7", "_8", "_9", "multiply", "_4", "_5", "_6", "minus", "_1", "_2", "_3", "plus", "_0", "dot", "equals"]
    let values = ["C", "+/-", "<=", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]
    let btn;
    for (let i = 0; i < clas.length; i++) {
        btn = document.createElement("input")
        btn.type = "button";
        btn.value = values[i]
        btn.className = clas[i];
        btn.classList.add("keys");
        keyboard.appendChild(btn);
    }

}

function render() {

    let clas = ["C", "plus_minus", "back_space", "divide", "_7", "_8", "_9", "multiply", "_4", "_5", "_6", "minus", "_1", "_2", "_3", "plus", "_0", "dot", "equals"]
    let allow = ["divide", "_7", "_8", "_9", "multiply", "_4", "_5", "_6", "minus", "_1", "_2", "_3", "plus", "_0", "dot"]
    let key = [];
    for (let i = 0; i < clas.length; i++) {
        if (allow.includes(clas[i])) {
            key[i] = document.getElementsByClassName(clas[i])[0];
            key[i].addEventListener("click", () => {
                if (state == 1) {
                    upper_dis = ""
                }
                state = 0;
                if (checked != 0) {
                    remove_class();
                    checked = 0;
                }
                if (checked == 0) {
                    key[i].classList.add("keys_clicked");
                    checked = 1;
                }
                lower_dis += key[i].value;
                // console.log(key[i].value);
                lower.innerText = lower_dis;
                upper.innerText = upper_dis;
                if (lower_dis[0] == "0") {
                    lower_dis = lower_dis.substring(1, lower_dis.length);
                    lower.innerText = lower_dis;
                }
            })

        }
    }}

    function remove_class() {
        let clic;
        clic = document.getElementsByClassName("keys_clicked")[0];
        clic.classList.remove("keys_clicked");
    }

    function clear() {
        let clear = document.getElementsByClassName("C")[0];
        clear.addEventListener("click", () => {
            lower_dis = "0"
            upper_dis = ""
            lower.innerText = lower_dis;
            upper.innerText = upper_dis;
        });
    }

    function cancle() {
        keyys[2].addEventListener("click", () => {
            lower_dis = lower_dis.substring(0, lower_dis.length - 1)
            lower.innerText = lower_dis;
        })
    }

    // Eval Function Used instead if this function

    function result(str) {
        if (String(str).includes("-")) {
            return result(str.substring(0, str.indexOf("-"))) - result((str.substring(str.indexOf("-") + 1, str.length)));

        }
        else if ((String(str)).includes("+")) {
            return parseFloat(result(str.substring(0, str.indexOf("+")))) + parseFloat(result(str.substring(str.indexOf("+") + 1, str.length)));
        }
        else if (String(str).includes("*")) {
            return result(str.substring(0, str.indexOf("*"))) * result(str.substring(str.indexOf("*") + 1, str.length));
        }
        else if (String(str).includes("/")) {
            return result(str.substring(0, str.indexOf("/"))) / result(str.substring(str.indexOf("/") + 1, str.length));
        }
        else {
            return str
        }
    }

    //For testing the result function

    function testing() {
        let test_data = ["167*675/89+9-9.7", "5*78/9-80", "289.9*456.34-276/89", "4*-2"];
        test_data.forEach((data) => {
            if (Math.round((eval(data) * 100000)) / 100000 == Math.round(result(data) * 100000) / 100000) {
                console.log("Test Case " + test_data.indexOf(data) + " Passed")
            }
            else {
                console.log("Test Case " + test_data.indexOf(data) + " Failed")
            }
        })
    }


    // +/- button function

    function do_plus_minus() {
        let ope = "/*+-"
        for (let i = lower_dis.length - 2; i >= 0; i--) {
            if (ope.includes(lower_dis[i])) {
                if (lower_dis[i] == "+") {
                    lower_dis = lower_dis.substring(0, i) + "-" + lower_dis.substring(i + 1, lower_dis.length)
                    lower.innerText = lower_dis;
                    return
                }
                else if (lower_dis[i] == "-") {
                    lower_dis = lower_dis.substring(0, i) + "+" + lower_dis.substring(i + 1, lower_dis.length);
                    lower.innerText = lower_dis;
                    return
                }
                else if (lower_dis[i] == "*") {
                    lower_dis = lower_dis.substring(0, i + 1) + "-" + lower_dis.substring(i + 1, lower_dis.length);
                    lower.innerText = lower_dis;
                    return
                }
                else {
                    lower_dis = lower_dis.substring(0, i + 1) + "-" + lower_dis.substring(i + 1, lower_dis.length);
                    lower.innerText = lower_dis;
                    return
                }
            }
        }
        if (!ope.includes(lower_dis[0])) {
            lower_dis = "-" + lower_dis;
            lower.innerText = lower_dis;
            console.log("no")
            return
        }
    }


    create_keys()

    render()
    clear()
    cancle()
    keyys[18].addEventListener("click", () => {
        state = 1;
        // console.log(result(lower_dis));
        upper_dis = lower_dis;
        try {
            lower_dis = eval(lower_dis);
        }
        catch {
            lower_dis = "Error";
        }
        lower.innerText = lower_dis;
        upper.innerText = upper_dis;
    })
    keyys[1].addEventListener("click", do_plus_minus)


// testing()