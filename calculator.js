const NUM_PAD = document.querySelectorAll(".numberBtn");
const OPERATOR_BTNS = document.querySelectorAll(".operatorBtn");
const ENTER_BTN = document.querySelector(".enterBtn");
const CLEAR_BTN = document.querySelector(".clearBtn");
const DISPLAY = document.querySelector(".calcDisplay");
let firstNum, operator, secondNum;
let displayContent = "";

NUM_PAD.forEach(btn => {
    btn.addEventListener("click", function () {
        if (displayContent[6] || displayContent === "Error") return;

        displayContent += this.textContent;
        updateDisplay();
    });
});

OPERATOR_BTNS.forEach(btn => {
    btn.addEventListener("click", function () {
        if (operator || !displayContent || displayContent === "Error") return;

        firstNum = displayContent;
        displayContent = this.textContent + " ";
        operator = this.textContent;
        updateDisplay();
    });
});

CLEAR_BTN.addEventListener("click", () => wipeMemory());

ENTER_BTN.addEventListener("click", () => {
    if (!displayContent || displayContent === "Error") return;
    secondNum = displayContent.slice(2);
    if (!secondNum) return;

    const result = operate(firstNum, operator, secondNum);
    const roundedResult = roundResult(result);
    wipeMemory();
    displayContent = roundedResult;
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

function roundResult(result) {
    if (result === "Error") return result;

    if (result.toString().includes(".")) {
        result = result.toPrecision(6);
    } else if (result.toString().length > 6) {
        result = result.toPrecision(3);
    }

    return result;
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