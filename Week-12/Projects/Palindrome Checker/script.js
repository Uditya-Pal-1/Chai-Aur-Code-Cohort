const inputField = document.getElementById('inputField')
const checkButton = document.getElementById('checkButton')
const resultDisplay = document.getElementById('result')

checkButton.addEventListener('click', function () {
    const text = (inputField.value.toLowerCase().replaceAll(" ", ""))
    const reversedText = text.split("").reverse().join("")
    if (text === reversedText) {
        resultDisplay.innerText = ` ${inputField.value} is  a Palindrome`
        resultDisplay.style.color = 'green'

    }
    else {
        resultDisplay.innerText = `${inputField.value} is NOT a Palindrome`
        resultDisplay.style.color = 'red'
    }
})