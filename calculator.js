const NUM_PAD = document.querySelectorAll(".numberBtn");
const OPERATOR_BTNS = document.querySelectorAll(".operatorBtn");
const ENTER_BTN = document.querySelector(".enterBtn");
const CLEAR_BTN = document.querySelector(".clearBtn");
const DISPLAY = document.querySelector(".calcDisplay");
let firstNum, operator, secondNum;
let displayContent = "";

NUM_PAD.forEach(btn => {
    btn.addEventListener("click", function () {
        displayContent += this.textContent;
        updateDisplay();
    });
});

OPERATOR_BTNS.forEach(btn => {
    btn.addEventListener("click", function () {
        if (operator || !displayContent) return;
        firstNum = displayContent;
        displayContent = this.textContent + " "
        operator = this.textContent;
        updateDisplay();
    });
});

CLEAR_BTN.addEventListener("click", () => {
    firstNum = null;
    operator = null;
    secondNum = null;
    clearDisplay();
});

function clearDisplay() {
    displayContent = "";
    updateDisplay();
}

function updateDisplay() {
    DISPLAY.textContent = displayContent;
    console.log(`${firstNum} ${operator} ${secondNum} | ${displayContent}`);
}

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