const previousElement = document.querySelector(".previous-element") 
const currentElement = document.querySelector(".current-element")
const clearButton = document.querySelector(".button-clear") 
const posNeg = document.querySelector(".button-posneg") 
const deleteButton = document.querySelector(".button-deletion") 
const dotButton = document.querySelector(".button-dot") 
// const percentageButton = document.querySelector(".button-percentage") 
const equalButton = document.querySelector(".button-equal") 


const operatorButtons = document.querySelectorAll(".button-operator")
const numberButtons = document.querySelectorAll(".button-number")

let operand = ['+',"-","×","÷"]

let previousNum = "";
let currentNum = "";
let currentOperator = "";
let needReset = false;

function add(a,b){
    return a + b
}

function subtract(a,b){
    return a - b
}

function multiply(a,b){
    return a * b
}

function divide(a,b){
    return a / b
}

function power(a,b){
    return a ** b
}

function operator(currentOperator, a, b){
    let firstNumber = +a
    let secondNumber = +b
    switch (currentOperator){
        case "+":
            return add(firstNumber,secondNumber);
        case "-":
            return subtract(firstNumber,secondNumber)
        case "×":
            return multiply(firstNumber,secondNumber)
        case "÷":
            return divide(firstNumber,secondNumber)
        case "^":
            return power(firstNumber,secondNumber)
    }
}

function setNumber(element){
    if (currentElement.textContent == "0" || needReset){
        resetDisplay()
    }
    currentElement.textContent += element
}

function resetDisplay(){
    currentElement.textContent = ""
    needReset = false
}

function clearDevice(){
    currentElement.textContent = "0"
    previousElement.textContent = "\u200C";
    previousNum = "";
    currentNum = "";
    currentOperator = "";
    needReset = false;
}

function calculate(){
    if (currentOperator === "" || needReset) return
    currentNum = currentElement.textContent
    currentElement.textContent = operator(currentOperator, previousNum, currentNum)
    previousElement.textContent = `${previousNum} ${currentOperator} ${currentNum} =`
    currentOperator = ""

}

function setOperator(operator){
    if (currentOperator !== "") calculate()
    previousNum = currentElement.textContent
    currentOperator = operator
    previousElement.textContent = `${previousNum} ${currentOperator}`
    needReset = true; 
}

numberButtons.forEach((button) => {
    button.addEventListener("click", ()=>{
        setNumber(button.textContent)
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener("click", ()=>{
        setOperator(button.textContent)
    })
})

equalButton.addEventListener("click", ()=>{
    calculate()
})

clearButton.addEventListener('click', ()=>{
    clearDevice()
})

