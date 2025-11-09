let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetOnNextInput = false; // Flag to track if we should clear after result

const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');

// Get all buttons
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const resultButton = document.querySelector('.result-btn');
const closeButton = document.querySelector('.close');
const minimizeButton = document.querySelector('.minimize');

// Number button click handlers
//add a listener to each digit button.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        //gets the visible digit (could contain whitespace).
        const number = button.textContent;
        
        // If we just got a result, clear everything and start fresh
        //after an equals, clear inputs so typing starts a new number.
        if (shouldResetOnNextInput) {
            currentInput = '';
            previousInput = '';
            operation = null;
            shouldResetOnNextInput = false;
        }
        
        // block entering a second leading zero.
        if (currentInput === '0' && number === '0') return;
        
        // build the number as a string (parsed later when calculating).
        currentInput += number;
        updateDisplay();
    });
});

// Operator button click handlers
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.textContent;
        
        if (currentInput === '') return;
        
        // Reset the flag since we're continuing with an operation
        shouldResetOnNextInput = false;
        
        if (previousInput !== '') {
            calculate();
        }
        
        operation = op;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    });
});

// Result button click handler
resultButton.addEventListener('click', () => {
    calculate();
    operation = null;
    shouldResetOnNextInput = true; // Set flag to clear on next number input
});

// Close button handler
closeButton.addEventListener('click', () => {
    alert('Calculator closed! (In a real app, this would close the window)');
});

// Minimize button handler
minimizeButton.addEventListener('click', () => {
    alert('Minimize button will work on real world.')
})

// Calculate function
function calculate() {
    if (previousInput === '' || currentInput === '' || operation === null) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clear();
                return;
            }
            result = prev / current;
            break;
    }
    
    currentInput = result.toString();
    previousInput = '';
    updateDisplay();
}

// Update display function
function updateDisplay() {
    if (currentInput === '') {
        resultDisplay.textContent = '0';
    } else {
        resultDisplay.textContent = currentInput;
    }
    
    if (previousInput !== '' && operation !== null) {
        expressionDisplay.textContent = `${previousInput} ${operation} ${currentInput || ''}`;
    } else {
        expressionDisplay.textContent = '';
    }
}

// Clear function
function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        // If we just got a result, clear everything and start fresh
        if (shouldResetOnNextInput) {
            currentInput = '';
            previousInput = '';
            operation = null;
            shouldResetOnNextInput = false;
        }
        currentInput += e.key;
        updateDisplay();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (currentInput === '') return;
        shouldResetOnNextInput = false;
        if (previousInput !== '') calculate();
        operation = e.key === '*' ? '×' : e.key;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
        operation = null;
        shouldResetOnNextInput = true; // Set flag to clear on next number input
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
    }
});

// Initialize display
updateDisplay();