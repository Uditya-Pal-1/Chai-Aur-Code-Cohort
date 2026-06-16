const firstValue = document.getElementById('firstValue')
const secondValue = document.getElementById('secondValue')
const result = document.getElementById('result')

function calculate(operator) {
    const num1 = parseInt(firstValue.value)
    const num2 = parseInt(secondValue.value)

    if (isNaN(num1) || isNaN(num2)) {
        result.innerText = "Enter a Valid Number. "
        return
    }
    switch (operator) {
        case '+': result.innerText = `Sum: ${num1 + num2}`
            break
        case '-': result.innerText = `Sub: ${num1 - num2}`
            break
        case '*': result.innerText = `Mult: ${num1 * num2}`
            break
        case '/':
            if(num2 === 0){
                result.innerText = 'Cannot divide by Zero'
            }else{
            result.innerText = `Div: ${num1 / num2}`
            }
            break
        default: result.innerText = `Invalid Operator`
    }
}

