const previousOperationText = document.querySelector("#previous-operation");
const currentOperationsText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationsText) {
        this.previousOperationText = previousOperationText
        this.currentOperationsText = currentOperationsText
        this.currentOperation = ""
    }

    //adicionar digito a calculadora
    addDigit(digit) {
        if(digit === "." && this.currentOperationsText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation) {
        if(this.currentOperation.innerText === "" && operation !== "C") {
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationsText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "=":
                this.processEqualOperator();
            break;
            case "DEL":
                this.processDelOperator();
            break;
            case "C":
                this.processClearOperation();
            break;
            case "CE":
                this.processClearCurrentOperation();
            break;
            default:
                return;
        }
    }

    updateScreen(
        operationValue = null,
        operation = null, 
        current = null, 
        previous = null) {
        if(operationValue === null) {
            this.currentOperationsText.innerText += this.currentOperation;
        } else {
            if(previous === 0) {
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationsText.innerText = "";
        }
    }

    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //Del Digit
    processDelOperator() {
        this.currentOperationsText.innerText = this.currentOperationsText.innerText.slice(0, -1);
    }
    processClearCurrentOperation() {
        this.currentOperationsText.innerText = "";
    }
    processClearOperation() {
        this.currentOperationsText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationsText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
           calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});