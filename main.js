const displayOperation = document.querySelector(".display-operation");
const displayCurrent = document.querySelector(".display-current");
const numbersBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const equalBtn = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLastOperation = document.querySelector(".last-entity-clear");
let displayOperationNum = "";
let displayCurrentNum = "";
let result = null;
let lastOperation = "";
let activeDot = false;

numbersBtns.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !activeDot) {
            activeDot = true;
        } else if (e.target.innerText === "." && activeDot) {
            return;
        }
        displayCurrentNum += e.target.innerText;
        displayCurrent.innerText = displayCurrentNum;        
    });
});

operationBtns.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!displayCurrentNum) return;
        activeDot = false;
        let operationName = e.target.innerText;
        if (displayOperationNum && displayCurrentNum && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(displayCurrentNum);
        }
        clearVar(operationName);
        lastOperation = operationName;        
    });
});

function clearVar(clear = "") {
    displayOperationNum += displayCurrentNum + " " + clear + " ";
    displayOperation.innerText = displayOperationNum;
    displayCurrent.innerText = "";
    displayCurrentNum = "";
}

function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(displayCurrentNum);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(displayCurrentNum);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(displayCurrentNum);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(displayCurrentNum);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(displayCurrentNum);
    }
}

equalBtn.addEventListener("click", () => {
    if (!displayCurrentNum || !displayOperationNum) return;
    activeDot = false;
    mathOperation();
    clearVar();
    displayCurrent.innerText = result;
    displayCurrentNum = result;
    displayOperationNum = "";
});

clearAll.addEventListener("click", () => {
    displayOperationNum = "";
    displayCurrentNum = "";
    displayOperation.innerText = "";
    displayCurrent.innerText = "";
    result = "";
});

clearLastOperation.addEventListener("click", () => {
    displayCurrent.innerText = "";
    displayCurrentNum = "";
});

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);        
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperation(e.key);
    } else if (e.key === "*") {
        clickOperation("x");        
    } else if (e.key == "Enter" || e.key === "=") {
        clickEqual();
    }   
});

function clickButtonEl(key) {
    numbersBtns.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}

function clickOperation(key) {
    operationBtns.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

function clickEqual() {
    equalBtn.click();
}