const digitalClock = document.querySelector('.digitalClock');

const analogClock = document.querySelector('.analogClock');
const hourHand = document.querySelector('.hour-hand')
const minHand = document.querySelector('.min-hand')
const secHand = document.querySelector('.sec-hand')

const dateDisplay = document.querySelector('.dateDisplay');
dateDisplay.innerText = '';

for (let i = 1; i <= 12; i++) {
    const numDiv = document.createElement('div')
    numDiv.classList.add('clock-number')
    numDiv.innerText = i;
    numDiv.style.transform = `rotate(${i * 30}deg) translateY(-80px) rotate(-${i * 30}deg)`;
    analogClock.appendChild(numDiv);
}

function updateAllClock() {


    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';


    const secDeg = seconds * 6;
    const minDeg = (minutes + (seconds / 60)) * 6;
    const hourDeg = ((date.getHours() % 12) + (minutes / 60)) * 30;
    secHand.style.transform = `rotate(${secDeg}deg)`
    minHand.style.transform = `rotate(${minDeg}deg)`
    hourHand.style.transform = `rotate(${hourDeg}deg)`


    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2, '0')
    seconds = seconds.toString().padStart(2, '0')

    digitalClock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`

    dateDisplay.style.color = `var(--primarycolor)`;
    dateDisplay.style.backgroundColor = '#454343';
    const day = date.getDate().toString().padStart(2,'0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = (date.getFullYear())
    dateDisplay.textContent = `${day}:${month}:${year}`;
}

updateAllClock();
setInterval(updateAllClock, 1000);