const startBtn = document.getElementById('startBtn')
const timeInput = document.getElementById('timeInput')
const countDownDisplay = document.getElementById('countDownDisplay')
const pause = document.getElementById('pause')
const resume = document.getElementById('resume')

let timer;
let valueInSeconds;

function runInterval(){

 countDownDisplay.innerText = `Remaining Time: ${valueInSeconds}`

    timer = setInterval(function () {
        valueInSeconds--;
        countDownDisplay.innerText = ` Time Remaining: ${valueInSeconds}`

        if (valueInSeconds <= 0) {
            clearInterval(timer);
            countDownDisplay.innerText='TimeUp ⏱️'
        }
    }, 1 * 1000)
}

function startTimer() {

    valueInSeconds = parseInt(timeInput.value)

    if (isNaN(valueInSeconds)) {
        countDownDisplay.innerText = "Please enter a valid number."
        return
    }
    if (valueInSeconds <= 0) {
        countDownDisplay.innerText = "Enter Second Greaterthen Zero."
        return
    }
    
 clearInterval(timer);

 runInterval();

}
function pauseTimer(){
    clearInterval(timer);
}
function resumeTimer(){
    clearInterval(timer)
    if(valueInSeconds > 0){
        runInterval();
    }
}

startBtn.addEventListener('click', startTimer);
pause.addEventListener('click',pauseTimer);
resume.addEventListener('click',resumeTimer);