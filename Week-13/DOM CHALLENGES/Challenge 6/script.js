const digitalClock = document.querySelector('.digitalClock');
const analogClock = document.querySelector('.analogClock');
const dateDisplay = document.querySelector('.dateDisplay');

setInterval(function digtialClock() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = hours.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2,'0')
    seconds = seconds.toString().padStart(2,'0')

    digitalClock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`

}, 1000)