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
        if (displayContent[MAX_DIGITS] || (prevAns && !operator) || checkMathError(displayContent)) return;

        displayContent += this.textContent;
        updateDisplay();
    });
});

OPERATOR_BTNS.forEach(btn => {
    btn.addEventListener("click", function () {
        if (operator || !displayContent || checkMathError(displayContent)) return;

        prevAns ? firstNum = prevAns : firstNum = displayContent;
        displayContent = this.textContent + " ";
        operator = this.textContent;
        updateDisplay();
    });
});

CLEAR_BTN.addEventListener("click", wipeMemory);

ENTER_BTN.addEventListener("click", () => {
    if (!operator || !displayContent || checkMathError(displayContent)) return;
    secondNum = displayContent.slice(2);
    if (!secondNum) return;

    const result = operate(firstNum, operator, secondNum);
    const roundedResult = roundResult(result);
    wipeMemory();
    displayContent = roundedResult;
    prevAns = result;
    updateDisplay();
});

function wipeMemory() {
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

function checkMathError(input) {
    return input === "Error" || input === "Overflow";
}

function roundResult(result) {
    if (checkMathError(result)) return result;
    const tooLong = result.toString().length > MAX_DIGITS;

    if (tooLong) {
        if (isCloseToZero(result) || isFarFromZero(result)) {
            result = result.toExponential(MAX_DIGITS - 4);
        } else if (result > -1 && result < 1) {
            result = result.toFixed(MAX_DIGITS);
        } else result = result.toPrecision(MAX_DIGITS);
    }
    if (isExponentTooLong(result)) return "Overflow";
    return result;
}

function isExponentTooLong(num) {
    num = num.toString();
    const start = num.indexOf("e");
    if (start === -1) return;

    const exponent = num.slice(start);
    if (exponent.length > 4) return true;
}

function isCloseToZero(num) {
    const minDistFromZero = 1 / (10 ** MAX_DIGITS);
    
    if (num > 0 && num < minDistFromZero) return true;
    if (num > (minDistFromZero * -1) && num < 0) return true;
}

function isFarFromZero(num) {
    const maxDistFromZero = 10 ** MAX_DIGITS;
    
    if (num > maxDistFromZero) return true;
    if (num < (maxDistFromZero * -1)) return true;
}

function operate(firstNum, operator, secondNum) {
    x = Number(firstNum);
    y = Number(secondNum);

    switch (operator) {
        case "+" :
            return x + y;
        case "-" :
            return x - y;
        case "*" :
            return x * y;
        case "/" :
            if (secondNum === "0") return "Error";
            return x / y;
    }
}