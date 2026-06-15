function updateClock() {
    let timeElement = document.getElementById('time');
    let dateElement = document.getElementById('date');

    const now = new Date();
    const Hour = now.getHours() % 12 || 12;
    const min = String(now.getMinutes()).padStart(2, "0")
    const sec = String(now.getSeconds()).padStart(2, "0")
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month:'long',
        day:'numeric'
    };

    const dateStr = now.toLocaleDateString(undefined, options)

    timeElement.textContent = `${Hour}:${min}:${sec} ${ampm}`;

    dateElement.textContent = dateStr;

}


setInterval(updateClock, 1000);
updateClock();