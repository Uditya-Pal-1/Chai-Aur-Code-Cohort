const billAmountInput = document.getElementById('billAmount')
const tipPercentageInput = document.getElementById('tipPercentage')
const numPeopleInput = document.getElementById('numPeople')
const calcButton = document.getElementById('calculateButton')
const totalTipDisplay = document.getElementById('totalTip')
const tipPerPersonDisplay = document.getElementById('tipPerPerson')

calcButton.addEventListener('click', function () {
    const billAmount = parseFloat(billAmountInput.value)
    const tipPercentage = parseFloat(tipPercentageInput.value)
    const numPeople = parseFloat(numPeopleInput.value)

    if( !isNaN(billAmount) && !isNaN(tipPercentage) && !isNaN(numPeople )){
        const totalTip = (billAmount * tipPercentage)/100
        const tipPerPerson = totalTip / numPeople
        totalTipDisplay.textContent = `Total Tip: ${totalTip.toFixed(2)}`
        tipPerPersonDisplay.textContent = `Tip Per Person ${tipPerPerson.toFixed(2)}`
    }
    else{
        alert("Please Enter Valid Values for all fields.")
    }
})