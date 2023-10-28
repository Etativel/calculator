const previousElement = document.querySelector(".previous-element") 
const currentElement = document.querySelector(".current-element")
const clearButton = document.querySelector(".button-clear")  
const deleteButton = document.querySelector(".button-deletion") 
const dotButton = document.querySelector(".button-dot") 
const equalButton = document.querySelector(".button-equal") 
const operatorButtons = document.querySelectorAll(".button-operator")
const numberButtons = document.querySelectorAll(".button-number")


let previousNum = "";
let currentNum = "";
let currentOperator = "";
let needReset = false;
let zeroDivisonStatus = false;

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
function deleteElement() {
    if (zeroDivisonStatus) return;
    if (currentElement.textContent == "Infinity") return
    console.log(currentElement.textContent.length);
    if (currentElement.textContent.length > 1) {
        currentElement.textContent = currentElement.textContent.slice(0, -1);
    } else if (currentElement.textContent.length === 1) {
        currentElement.textContent = "0";
    }
}
function addDot(){
    if (currentElement.textContent.includes(".")) return
    currentElement.textContent += "."
}
function calculate(){
    if (currentOperator === "" || needReset) return
    currentNum = currentElement.textContent
    if (currentNum === "0" && currentOperator == "÷"){
        currentElement.textContent = "No zero division";
        zeroDivisonStatus = true;
    }else{
        currentElement.textContent = operator(currentOperator, previousNum, currentNum)
        previousElement.textContent = `${previousNum} ${currentOperator} ${currentNum} =`
        currentOperator = ""
    }
}
function roundResult(result){
    return Math.round(result * 1000) / 1000
}
function setOperator(operator){
    if (currentOperator !== "") calculate()
    if (zeroDivisonStatus == true){
        clearDevice()
        zeroDivisonStatus = false;
        return;
    }
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

function convertOperator(operator){
    if (operator == "*") return "×"
    if (operator == "/") return "÷"
    if (operator == "+") return "+"
    if (operator == "-") return "-"
    if (operator == "^") return "^"
}

function handleKeyDown(e){
    if (e.key <= 9 && e.key >= 0) setNumber(e.key)
    if (e.key == "Backspace") deleteElement()
    if (e.key == "Delete") clearDevice()
    if (e.key == ".") addDot()
    if (e.key == "=" || e.key == "Enter") {
        e.preventDefault()
        calculate()
    }
    if (e.key == "*" || e.key == "/" || e.key == "+" || e.key == "-" || e.key == "^"){
       setOperator(convertOperator(e.key))
    }
}

equalButton.addEventListener("click", calculate)
clearButton.addEventListener('click', clearDevice)
deleteButton.addEventListener("click",deleteElement)
dotButton.addEventListener("click", addDot)
window.addEventListener("keydown", handleKeyDown)
