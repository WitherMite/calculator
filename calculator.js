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

CLEAR_BTN.addEventListener("click", () => wipeMemory());

ENTER_BTN.addEventListener("click", () => {
    if (!displayContent) return;
    secondNum = displayContent.slice(2);
    if (!secondNum) return;

    const result = operate(firstNum, operator, secondNum);
    wipeMemory();
    displayContent = result;
    updateDisplay();
});

function wipeMemory () {
    firstNum = null;
    operator = null;
    secondNum = null;

    displayContent = "";
    updateDisplay();
}

function updateDisplay() {
    DISPLAY.textContent = displayContent;
    console.log(`${firstNum} ${operator} ${secondNum} | ${displayContent}`);
}

function operate(firstNum, operator, secondNum) {
    x = Number(firstNum);
    y = Number(secondNum);

    switch (operator) {
        case "+" :
            return add(x, y);
        case "-" :
            return subtract(x, y);
        case "*" :
            return multiply(x, y);
        case "/" :
            return divide(x, y);
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