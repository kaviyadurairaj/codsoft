let currentOperation = null;
let currentOperand = '';
let previousOperand = '';

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    currentOperation = null;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    if (previousOperand || currentOperation) {
        display.innerText = `${previousOperand} ${currentOperation || ''} ${currentOperand}`;
    } else {
        display.innerText = currentOperand || "0";
    }
}

function appendNumber(number) {
    if (currentOperand.includes('.') && number === '.') return;
    currentOperand = `${currentOperand}${number}`;
    updateDisplay();
}

function chooseOperation(operation) {
    if (currentOperand === '' && previousOperand === '') return;
    if (currentOperand === '' && previousOperand !== '') {
        currentOperation = operation;
        updateDisplay();
        return;
    }
    if (previousOperand !== '') {
        calculateResult();
    }
    currentOperation = operation;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculateResult() {
    let calculation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperation) {
        case '+':
            calculation = prev + current;
            break;
        case '-':
            calculation = prev - current;
            break;
        case '*':
            calculation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            calculation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = calculation.toString();
    currentOperation = null;
    previousOperand = '';
    updateDisplay();
}