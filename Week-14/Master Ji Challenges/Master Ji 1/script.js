const moodBtn = document.querySelector(".moodBtn");
const saveBtn = document.getElementById("saveMessage");
// const timelineBtn = document.querySelector(".timelinebtn");
// const calendarBtn = document.querySelector('.calendarBtn');
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

moodBtn.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        const moodText = e.target.getAttribute('data-mood')
        const emojiFace = e.target.innerText;
        saveLog(moodText,  emojiFace);
    })
})