let textScreen = document.querySelector(".screen .text");
const buttons = document.querySelectorAll("button");
let text = textScreen.textContent;
let infix = "";
let answer = 0;
let postfix = "";
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
    else if(n == " = "){
        postfix = shuntingYard(textScreen.textContent);
        console.log("postfix = ", postfix);
        evalPost(postfix);
        if(textScreen.textContent[textScreen.textContent.length-2] == "="){
          return;
        }
    }
    else if(n == "←"){
      if(textScreen.textContent[textScreen.textContent.length-1] == " "){
        textScreen.textContent = removeLastCharacter(textScreen.textContent);
        textScreen.textContent = removeLastCharacter(textScreen.textContent);
        textScreen.textContent = removeLastCharacter(textScreen.textContent);
      }else{
        textScreen.textContent = removeLastCharacter(textScreen.textContent);
      }
      n = '';
    }
    else if(n == ' - ' || n == ' + '){
      if(textScreen.textContent == " + " || textScreen.textContent == " - " ){
        return;
      }
    }
    textScreen.textContent += n;
}


function precedence(operator) {
  if (operator === '+' || operator === '-') return 1;
  if (operator === '*' || operator === '/' || operator === '%') return 2;
  
  
  return 0;
}

function shuntingYard(expression) {
  expression = expression.replace('÷', '/');
  expression = expression.replace('×', '*');
  console.log(expression);

  
  const outputQueue = [];
  const operatorStack = [];

  const tokens = expression.split(/\s+/);

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(parseFloat(token));
    } else if (token === '+' || token === '-' || token === '*' || token === '/' || token === '%') {
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

function evalPost(postfix){
    let stack = [];
    let element;
    let operand1;
    let operand2;
    let ans;

    for(let i = 0; i < postfix.length; i++){
        element = postfix[i];
        if(element == '*' || element == '/' || element == '-' || element == '+' || element == '%'){
            operand1 = stack[0];
            operand2 = stack[1];

            if(stack.length < 2){
                if(element == '-'){
                    ans = operand1 * -1;
                    stack.pop();
                }
                if(element == '+'){
                    ans = operand1 * 1;
                    stack.pop();
                }
            }
            else{
                operand1 = stack.pop();
                operand2 = stack.pop();
                if(element == '*'){
                    ans = operand1 * operand2;
                }
                if(element == '/'){
                    ans = operand2 / operand1;
                }
                if(element == '-'){
                    ans = operand2 - operand1;
                }
                if(element == '+'){
                    ans = operand1 + operand2;
                }
                if(element == '%'){
                  ans = operand2 % operand1;
              }
            }
            
            console.log("op1 = ",operand1);
            console.log("op2 = ",operand2);
            console.log("answer = ", ans);
            stack.push(ans);

        }
        else{
            stack.push(element);
             
        }
        console.log("stack = ",stack);

    }

}

function removeLastCharacter(inputString) {
  if (typeof inputString !== 'string') {
    throw new Error('Input must be a string.');
  }

  if (inputString.length === 0) {
    throw new Error('Input string is empty.');
  }

  return inputString.slice(0, -1);
}