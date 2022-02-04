let frame=document.getElementsByClassName("img_holder")[0];
let btn1=document.getElementsByClassName("btn1")[0];
let input=document.getElementsByClassName("search_box")[0]

function getImg(){
    const url="https:/api.unsplash.com/search/photos/?query="+input.value+"&per_page=6&client_id=TqGPBSCfI7Q23Jit8mrTdBsX0P_gRu5BhqzMRRT8Grg"

    fetch(url)
    .then(response => {
        // console.log(response)
        if(response.ok){
            // console.log(response.json())
            console.log("CLICK")
            return response.json()
        }
        else
        alert(response.status)
    })
    .then(data => {
        console.log(data)
        const imgs=[];
        const holder=[];
        for(let i=0; i<data.results.length; i++){
            holder[i]=document.createElement("div")
            holder[i].className="holder";
            imgs[i]=document.createElement("div");
            imgs[i].className="img";
            imgs[i].style.backgroundImage='url('+data.results[i].urls.raw+')';
            btn1.addEventListener('click',()=>{
                for(i of frame.childNodes){
                    frame.removeChild(i)
                }
            })
            input.addEventListener('keydown',function(key){
                if(key.code==="Enter"){
                    for(i of frame.childNodes){
                        frame.removeChild(i)
                    } 
                }
            })
        holder[i].appendChild(imgs[i]);
        frame.appendChild(holder[i]);
        }
        // for(let i=0; i<data.results.length; i++){
        //     holder[i]=document.createElement("div")
        //     holder[i].className="holder";
        //     imgs[i]=document.createElement("img");
        //     imgs[i].className="img";
        //     imgs[i].src=data.results[i].urls.raw;
        //     btn1.addEventListener('click',()=>{
        //         for(i of frame.childNodes){
        //             frame.removeChild(i)
        //         }
        //     })
        //     input.addEventListener('keydown',function(key){
        //         if(key.code==="Enter"){
        //             for(i of frame.childNodes){
        //                 frame.removeChild(i)
        //             } 
        //         }
        //     })
        // holder[i].appendChild(imgs[i]);
        // frame.appendChild(holder[i]);
        // }
    })
}

btn1.addEventListener("click", getImg)
btn1.addEventListener('click',()=>{console.log("clicked")})
input.addEventListener('keydown', function(key){
    if(key.code==="Enter"){
        getImg();
    }
})



