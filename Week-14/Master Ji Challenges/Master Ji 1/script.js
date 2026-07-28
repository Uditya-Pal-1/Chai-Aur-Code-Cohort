const moodBtns = document.querySelectorAll(".moodBtn");
const saveMessage = document.getElementById("saveMessage");
const timelineBtn = document.querySelector(".timelinebtn");
const calendarBtn = document.querySelector('.calendarBtn');
const timelineView = document.getElementById('timelineView');
const calendarView = document.getElementById('calendarView');

function getDate(){
    const today = new Date();
    const offset = today.getTimezoneOffset()*60000;
    return(new Date(today - offset)).toISOString().split('T')[0];
}

function getLogs(){
    return JSON.parse(localStorage.getItem('moodLogs')) || [];
}

function saveLog(mood, emoji){
    let logs = getLogs();
    const today = getDate();

    const existingIndex = logs.findIndex(log => log.date === today)
    if (existingIndex != -1){
        logs[existingIndex] = {date: today, mood: mood, emoji: emoji}
    }else{
        logs.push({date:today, mood: mood, emoji: emoji})
    }
    localStorage.setItem('moodLogs', JSON.stringify(logs))
    saveMessage.innerText = 'Mood Saved!'
    setTimeout(()=>saveMessage.innerText = "", 2000)
    renderTimeline();
    renderCalendar();
}

moodBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        const moodText = e.target.getAttribute('data-mood')
        const emojiFace = e.target.innerText;
        saveLog(moodText,  emojiFace);
    })
})

function renderTimeline(){
    const logs = getLogs();
    timelineView.innerHTML = '';

    if(logs.length === 0){
        timelineView.innerHTML = '<p>No Mood Yet. Click On Add Mood </p>'
        return;
    }
    logs.sort((a,b) => new Date(b.date) - new Date(a.date))
    logs.forEach(log =>{
        const div = document.createElement('div')
        div.classList.add('timeline-item')
        div.innerHTML = `
        <span><strong>${log.date}</strong></span>
        <span>${log.emoji} ${log.mood}</span>
        `;
        timelineView.appendChild(div);
    })
}

function renderCalendar(){
    const logs = getLogs();
    calendarView.innerHTML = '';

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    let calendarHTML = `<h3> Month: ${month + 1}/ ${year}</h3>`
    calendarHTML +=`<div class='calendar-grid'>`;

    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    days.forEach(day =>calendarHTML += `<div class = 'day-header'>${day}</div>`)

    for (let i = 0; i < firstDayOfWeek; i++){
        calendarHTML += `<div class = 'calendar-cell'></div>`
    }
    
    for(let day = 1; day <= daysInMonth; day++){
        const paddedMonth = String(month + 1).padStart(2, '0')
        const paddedDay = String(day).padStart(2, '0')
        const currentDateStr = `${year}-${paddedMonth}-${paddedDay}`
        
        const matchedLog = logs.find(log => log.date===currentDateStr);
        if (matchedLog){
            calendarHTML += `
            <div class = 'calendar-cell has-mood'>
            <span>${day}</span>
            <span>${matchedLog.emoji}</span>
            </div>`
        }else{
            calendarHTML += `
            <div class='calendar-cell'>
            <span>${day}</span>
            </div>`
        }
    }
    calendarHTML += `</div>`
    calendarView.innerHTML = calendarHTML;
};

timelineBtn.addEventListener('click',()=>{
    timelineView.classList.remove('hidden');
    calendarView.classList.add('hidden')

    timelineView.classList.add('active')
    calendarView.classList.remove('active')
});

calendarBtn.addEventListener('click', () =>{
    calendarView.classList.remove('hidden')
    timelineView.classList.add('hidden')

    timelineView.classList.add('active')
    calendarView.classList.remove('active')
});

renderTimeline();
renderCalendar();