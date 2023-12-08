let firstNum, operator, secondNum;

function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case "+" :
            return add(firstNum, secondNum);
        case "-" :
            return subtract(firstNum, secondNum);
        case "*" :
            return multiply(firstNum, secondNum);
        case "/" :
            return divide(firstNum, secondNum);
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}