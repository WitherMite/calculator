const NUM_PAD = document.querySelectorAll(".numberBtn");
const OPERATOR_BTNS = document.querySelectorAll(".operatorBtn");
const ENTER_BTN = document.querySelector(".enterBtn");
const CLEAR_BTN = document.querySelector(".clearBtn");
const DISPLAY = document.querySelector(".calcDisplay");
const MAX_DIGITS = 6;
let firstNum, operator, secondNum, prevAns;
let displayContent = "";

NUM_PAD.forEach(btn => {
    btn.addEventListener("click", function () {
        if (displayContent[MAX_DIGITS] || (prevAns && !operator) || displayContent === "Error") return;

        displayContent += this.textContent;
        updateDisplay();
    });
});

OPERATOR_BTNS.forEach(btn => {
    btn.addEventListener("click", function () {
        if (operator || !displayContent || displayContent === "Error") return;

        prevAns ? firstNum = prevAns : firstNum = displayContent;
        displayContent = this.textContent + " ";
        operator = this.textContent;
        updateDisplay();
    });
});

CLEAR_BTN.addEventListener("click", () => wipeMemory());

ENTER_BTN.addEventListener("click", () => {
    if (!operator || !displayContent || displayContent === "Error") return;
    secondNum = displayContent.slice(2);
    if (!secondNum) return;

    const result = operate(firstNum, operator, secondNum);
    const roundedResult = roundResult(result);
    wipeMemory();
    displayContent = roundedResult;
    prevAns = result;
    updateDisplay();
});

function wipeMemory () {
    firstNum = null;
    operator = null;
    secondNum = null;
    prevAns = null;

    displayContent = "";
    updateDisplay();
}

function updateDisplay() {
    DISPLAY.textContent = displayContent;
    console.log(`${firstNum} ${operator} ${secondNum} | ${displayContent} ${prevAns}`);
}

function roundResult(result) {
    if (result === "Error") return result;
    const tooLong = result.toString().length > MAX_DIGITS;
    const decimalOnDisplay = result.toString().lastIndexOf(".", MAX_DIGITS) !== -1;

    if (tooLong) {
        if (decimalOnDisplay) {
            result = result.toPrecision(MAX_DIGITS);
        } else result = result.toPrecision(MAX_DIGITS - 3);
    } return result;
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
            if (secondNum === "0") return "Error";
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