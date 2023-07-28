let textScreen = document.querySelector(".screen .text");
const buttons = document.querySelectorAll("button");
let text = textScreen.textContent;
console.log(text);

buttons.forEach((button) =>{
    button.addEventListener('click', btnClick);
});

function btnClick(event){
    let n = event.target.textContent;
    if(n == "AC"){
        textScreen.innerHTML = "";
        return;
    }
    else if(n == "."){
        if(textScreen.textContent[textScreen.textContent.length-1] == "."){
            return;
        }
    }
    else if(n == "="){
        
    }
    textScreen.textContent += n;
    
}