// let textScreen = document.querySelector(".screen .text");
// const buttons = document.querySelectorAll("button");
// let text = textScreen.textContent;
// console.log(text);

// buttons.forEach((button) =>{
//     button.addEventListener('click', btnClick);
// });

// function btnClick(event){
//     let n = event.target.textContent;
//     if(n == "AC"){
//         textScreen.innerHTML = "";
//         return;
//     }
//     else if(n == "."){
//         if(textScreen.textContent[textScreen.textContent.length-1] == "."){
//             return;
//         }
//     }
//     else if(n == "="){
        
//     }
//     textScreen.textContent += n; 
// }


  function precedence(operator) {
    if (operator === '+' || operator === '-') return 1;
    if (operator === '*' || operator === '/') return 2;
    return 0;
  }
  
  function shuntingYard(expression) {
    const outputQueue = [];
    const operatorStack = [];
  
    const tokens = expression.split(/\s+/);
  
    tokens.forEach((token) => {
      if (!isNaN(parseFloat(token))) {
        outputQueue.push(parseFloat(token));
      } else if (token === '+' || token === '-' || token === '*' || token === '/') {
        while (
          operatorStack.length > 0 &&
          precedence(token) <= precedence(operatorStack[operatorStack.length - 1])
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop(); // Discard the left bracket
      }
    });
  
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
  
    return outputQueue;
  }
  
  // Test the function
  const expression = "3 + 4 * ( 2 - 1 ) / 5";
  const result = shuntingYard(expression);
  console.log(result); // Output: [3, 4, 2, 1, '-', '*', 5, '/', '+']